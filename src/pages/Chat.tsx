import { useEffect, useState } from 'react';
import { ChatArea } from '@/components/ChatArea'
import { ChatInput } from '@/components/ChatInput';
import { ChatSidebar } from '@/components/ChatSidebar';
import { toast } from 'sonner';
import { useUserId } from '@/hooks/use-user-id';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useNavigate, useParams } from 'react-router';
import { useChatQueries } from '@/hooks/chat/chat-query';
import { useMessageQueries } from '@/hooks/message/message-query';
import { useMessagesMutation } from '@/hooks/message/message-mutation';
import type { Message } from '@/components/ChatMessage';
import { useChatsMutation } from '@/hooks/chat/chat-mutation';

const Chat = () => {
    const { useMessageMutation } = useMessagesMutation();
    const { useChat } = useChatQueries();
    const { useChatMutation } = useChatsMutation();
    const { useMessage } = useMessageQueries();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [localMessages, setLocalMessages] = useState<Message[]>([]);
    const { data: chat, isLoading: isChatLoading } = useChat(id);
    const { data: messages, isLoading: isMessageLoading } = useMessage(id);
    const chatMutation = useChatMutation();
    const messageMutation = useMessageMutation();
    const navigate = useNavigate();
    const { isLoading, userId } = useUserId();

    useEffect(() => {
        setLocalMessages([]);
    }, [id]);

    const handleSendMessage = async (content: string) => {
        if (chat?.data.id && content) {
            const chat_id = chat.data.id;

            const tempId = `temp-${Date.now()}`;
            setLocalMessages(prev => [
                ...prev,
                {
                    id: tempId,
                    content,
                    reply: "",
                    created_at: new Date().toISOString(),
                    isPending: true
                } as Message & { isPending?: boolean }
            ]);

            const result = await messageMutation.mutateAsync({ content, chat_id });

            setLocalMessages(prev =>
                prev.map(m =>
                    m.id === tempId
                        ? {
                            ...m,
                            id: result.data.id,
                            reply: result.data.reply,
                            isPending: false
                        }
                        : m
                )
            );
        }
    };

    const handleNewChat = async (user_id: string, persona_id: number) => {
        try {
            await chatMutation.mutateAsync({ user_id, persona_id })
            toast("Add new chat success.");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast("Add new chat failed")
        }
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!userId) {
        navigate('/login');
    }

    const finalMessages = [...(messages?.data || []), ...localMessages];

    return (
        <div className="h-screen flex bg-chat-background">
            <ChatSidebar
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                onNewChat={handleNewChat}
            />

            <div className="w-full flex-1 flex flex-col">
                <ChatArea
                    messages={finalMessages}
                    isChatLoading={isChatLoading}
                    isMessageLoading={isMessageLoading}
                />
                <ChatInput
                    onSendMessage={handleSendMessage}
                    persona={chat?.data.Persona.name || "Loading..."}
                    disabled={isMessageLoading}
                    placeholder="Message AI Companion..."
                />
            </div>
        </div>
    );
};

export default Chat;