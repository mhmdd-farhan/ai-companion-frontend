import { useEffect, useRef } from 'react';
import { ChatMessage, type Message } from './ChatMessage';
import LoadingSpinner from './ui/loading-spinner';

interface ChatAreaProps {
    messages: Message[] | undefined;
    isChatLoading?: boolean;
}

export function ChatArea({ messages, isChatLoading }: ChatAreaProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (isChatLoading) {
        <LoadingSpinner />
    }

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-background">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {messages?.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Start a conversation
                            </h3>
                            <p className="text-muted-foreground">
                                Send a message to begin chatting with the AI assistant.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {messages?.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}