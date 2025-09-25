import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSendMessage: (message: string, persona?: string) => void;
    persona: string
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({
    onSendMessage,
    disabled = false,
    persona,
    placeholder = "Type your message..."
}: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim() || disabled) return;

        setIsLoading(true);
        const messageToSend = message.trim();
        setMessage('');

        try {
            await onSendMessage(messageToSend);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-chat-border bg-chat-input/50 backdrop-blur-md p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-3 items-center justify-center">
                    <Button className='h-11 border bg-gray-700'>
                        <User className="h-4 w-4 mr-2" />
                        {persona}
                    </Button>

                    <div className="flex-1 relative">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            disabled={disabled || isLoading}
                            rows={1}
                            className={cn(
                                "min-h-[44px] max-h-32 resize-none",
                                "bg-chat-input border-chat-border",
                                "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                "placeholder:text-muted-foreground",
                                "transition-smooth",
                                "pr-12"
                            )}
                        />
                    </div>
                    <Button
                        onClick={handleSend}
                        disabled={!message.trim() || disabled || isLoading}
                        size="icon"
                        className={cn(
                            "h-11 w-11 rounded-xl",
                            "bg-primary hover:bg-primary/90",
                            "shadow-elegant transition-spring",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}