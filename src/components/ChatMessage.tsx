import LoadingSpinner from "./ui/loading-spinner";
import MarkdownRenderer from "./ui/markdown-renderer";

export interface Message {
    id: string;
    content: string;
    reply: string;
    created_at: string;
}

interface ChatMessageProps {
    message: Message & { isPending?: boolean };
    isLoading: boolean | undefined;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
    const { content, reply, isPending } = message;

    if (isLoading) {
        <LoadingSpinner />
    }

    return (
        <div className="flex flex-col w-full mb-6 space-y-3">
            {content && (
                <div className="self-end max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-glass backdrop-blur-sm bg-gray-100">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                    <div className="text-xs mt-2 opacity-70 text-chat-user-text text-right">
                        {new Date(message?.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            )}

            {isPending && (
                <div className="self-start max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-glass backdrop-blur-sm bg-chat-bot-bubble text-chat-bot-text border border-chat-border">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}

            {reply && !isPending && (
                <div className="self-start max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-glass backdrop-blur-sm bg-chat-bot-bubble text-chat-bot-text border border-chat-border">
                    <MarkdownRenderer content={reply} />
                    <div className="text-xs mt-2 opacity-70 text-muted-foreground">
                        {new Date(message?.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
