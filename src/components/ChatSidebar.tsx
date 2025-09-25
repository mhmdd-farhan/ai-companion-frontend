import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, MessageSquare, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { usePersonasQueries } from '@/hooks/persona/persona-query';
import LoadingSpinner from './ui/loading-spinner';
import { useUserQueries } from '@/hooks/user/user-query';
import { ChatHistorySkeleton } from './ui/loading-chat-history';

interface ChatSidebarProps {
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    onNewChat: (user_id: string, persona_id: number) => Promise<void>;
}

export function ChatSidebar({
    isCollapsed = false,
    onToggleCollapse,
    onNewChat
}: ChatSidebarProps) {
    const { useUserChat } = useUserQueries();
    const { useAllPersona } = usePersonasQueries();
    const [openDialog, setOpenDialog] = useState(false);
    const { data: allPersona, isLoading: isAllPersonaLoading } = useAllPersona();
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id") as string;
    const { data: userChat, isLoading: isUserChatLoading, refetch: userChatRefetch } = useUserChat(user_id);
    const [personaId, setPersonaId] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/login');
    }

    const handleAddChat = async () => {
        setOpenDialog(false);
        await onNewChat(user_id, Number(personaId));
        userChatRefetch();
    }

    return (
        <div className={cn(
            "h-full bg-chat-sidebar border-r border-chat-border transition-smooth",
            "flex flex-col shadow-glass",
            isCollapsed ? "w-16" : "w-80"
        )}>
            {/* Header */}
            <div className="p-4 border-b border-chat-border">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleCollapse}
                        className="hover:bg-accent"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {!isCollapsed && (
                        <>
                            <h2 className="font-semibold text-foreground">AI COMPANION</h2>
                            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                <DialogTrigger className='ml-auto'>
                                    <Button
                                        size="icon"
                                        className="bg-primary hover:bg-primary/90 shadow-elegant"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='w-fit space-y-4'>
                                    <DialogHeader>
                                        <DialogTitle>Personas</DialogTitle>
                                        <DialogDescription className='my-3.5'>
                                            <Select onValueChange={setPersonaId}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select a persona" />
                                                </SelectTrigger>
                                                <SelectContent className='my-5'>
                                                    {isAllPersonaLoading ? (
                                                        <LoadingSpinner />
                                                    ) : (
                                                        <SelectGroup>
                                                            <SelectLabel>Fruits</SelectLabel>
                                                            {allPersona?.data?.map((persona) => (
                                                                <SelectItem
                                                                    key={persona.id}
                                                                    value={String(persona.id)}
                                                                >
                                                                    {persona.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </DialogDescription>
                                        <DialogFooter>
                                            <Button onClick={handleAddChat}>Submit</Button>
                                        </DialogFooter>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>

            {/* Chat History */}
            {!isCollapsed && (
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-1">
                        {isUserChatLoading ? (
                            <ChatHistorySkeleton />
                        ) : (
                            <>
                                {userChat?.data.map((chat) => (
                                    <button
                                        key={chat.id}
                                        className={cn(
                                            "w-full text-left p-3 rounded-xl hover:bg-accent/50",
                                            "transition-smooth border border-transparent hover:border-chat-border",
                                            "group"
                                        )}
                                    >
                                        <Link
                                            to={`/${chat.id}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium text-sm text-foreground truncate">
                                                    {chat?.message_items?.[0]?.content || "Make a chat"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {chat.Persona.name}
                                            </p>
                                        </Link>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )
            }

            {/* Footer */}
            <div className="p-4 border-t border-chat-border">
                <Link className="w-full px-2 py-1.5 rounded-sm flex items-center justify-start hover:bg-accent" to={"/dashboard"}>
                    <LayoutDashboard className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">Dashboard</span>}
                </Link>
                <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    onClick={handleLogout}
                    className="w-full justify-start hover:bg-accent"
                >
                    <LogOut className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">Logout</span>}
                </Button>
            </div>
        </div >
    );
}