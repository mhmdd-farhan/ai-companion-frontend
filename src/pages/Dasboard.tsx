import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Send } from "lucide-react";
import { useUserQueries } from "@/hooks/user/user-query";
import { useChatQueries } from "@/hooks/chat/chat-query";
import { usePersonasQueries } from "@/hooks/persona/persona-query";
import { useMessageQueries } from "@/hooks/message/message-query";
import DashboardSkeleton from "@/components/ui/dashboard-loading-skeleton";
import { formatToLocalDateTime, getAverageLatency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePersonasMutation } from "@/hooks/persona/persona-mutation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Dashboard() {
    const {
        useAllUser
    } = useUserQueries();
    const {
        useAllChat
    } = useChatQueries();
    const {
        useAllPersona,
        usePersona
    } = usePersonasQueries();
    const {
        usePersonaMutation,
        useEditPersonaMutation
    } = usePersonasMutation();
    const {
        useAllMessage
    } = useMessageQueries();
    const [
        selectedPersonaId,
        setSelectedPersonaId
    ] = useState<number | null>(null);
    const {
        data: users,
        isLoading: isUsersLoading
    } = useAllUser();
    const {
        data: chats,
        isLoading: isChatsLoading
    } = useAllChat();
    const {
        data: personas,
        isLoading: isPersonasLoading,
        refetch: refetchPersonas
    } = useAllPersona();
    const {
        data: persona,
        isLoading: isPersonaLoading
    } = usePersona(selectedPersonaId);
    const {
        data: messages,
        isLoading: isMessagesLoading
    } = useAllMessage();

    const personaMutation = usePersonaMutation();
    const editPersonaMutation = useEditPersonaMutation();

    const [open, setOpen] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [systemPrompt, setSystemPrompt] = useState<string | null>(null);

    useEffect(() => {
        if (persona) {
            setName(persona.data.name);
            setSystemPrompt(persona.data.systemPrompt);
        }
    }, [persona]);

    if (
        isUsersLoading ||
        isChatsLoading ||
        isPersonasLoading ||
        isMessagesLoading
    ) {
        return <DashboardSkeleton />
    }

    const summaryData = {
        totalUsers: users?.data.length,
        totalChats: chats?.data.length,
        totalPersonas: personas?.data.length || "0",
        avgLatency: getAverageLatency(messages?.data),
    };

    const handleAddPersona = async () => {
        try {
            if (name && systemPrompt) {
                await personaMutation.mutateAsync({ name, systemPrompt });
                refetchPersonas();
                setOpen(false);
                setName(null);
                setSystemPrompt(null);
                toast("Add persona success");
            } else {
                toast("Name and System Prompt are required!");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast("Add persona failed");
            setOpen(false)
        }
    };

    const handleEditPersona = async () => {
        try {
            if (name && systemPrompt) {
                await editPersonaMutation.mutateAsync({ id: selectedPersonaId, name, systemPrompt });
                refetchPersonas();
                setOpenEditForm(false);
                setName(null);
                setSystemPrompt(null);
                setSelectedPersonaId(null);
                toast("Edit persona success");
            } else {
                setSelectedPersonaId(null);
                toast("Name and System Prompt are required!");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast("Add persona failed");
            setOpenEditForm(false);
            setSelectedPersonaId(null);
        }
    };

    return (
        <div className="p-10 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gray-50">
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{summaryData.totalUsers}</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50">
                    <CardHeader>
                        <CardTitle>Total Chats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{summaryData.totalChats}</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50">
                    <CardHeader>
                        <CardTitle>Total Personas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{summaryData.totalPersonas}</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50">
                    <CardHeader>
                        <CardTitle>Avg Latency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{summaryData.avgLatency}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <Table className="w-fit border border-gray-100 table-auto">
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Join Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.data.map((user, i) => (
                            <TableRow key={user.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{formatToLocalDateTime(user.created_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Personas Table */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Personas</h2>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className='ml-auto'>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Persona
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='w-fit space-y-4'>
                            <DialogHeader>
                                <DialogTitle>Persona Form</DialogTitle>
                                <DialogDescription className="space-y-4 my-3.5">
                                    <div className="space-y-1.5">
                                        <Label>Name</Label>
                                        <Input onChange={(e) => setName(e.target.value)} placeholder="Enter persona name" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>System Prompt</Label>
                                        <Textarea onChange={(e) => setSystemPrompt(e.target.value)} placeholder="Describe the persona" />
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <Button onClick={handleAddPersona} size="sm">
                                        <Send className="mr-2 h-4 w-4" />
                                        Submit
                                    </Button>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <Table className="space-x-4 border border-gray-100 table-fixed">
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>System Prompt</TableHead>
                            <TableHead>Total Chat</TableHead>
                            <TableHead>Total Messages</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {personas?.data.map((persona, i) => (
                            <TableRow key={persona.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{persona.name}</TableCell>
                                <TableCell className="max-w-1 truncate">{persona.systemPrompt}</TableCell>
                                <TableCell>{persona.chats.length}</TableCell>
                                <TableCell>{persona.chats.reduce((l, r) => l + r.message_items.length, 0)}</TableCell>
                                <TableCell>
                                    <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
                                        <DialogTrigger className='ml-auto'>
                                            <Button onClick={() => setSelectedPersonaId(persona.id)} variant="outline" size="sm">
                                                <Edit className="mr-1 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className='w-fit space-y-4'>
                                            <DialogHeader>
                                                <DialogTitle>Persona Form</DialogTitle>
                                                {isPersonaLoading ? (
                                                    <LoadingSpinner className="min-h-0" />
                                                ) : (
                                                    <DialogDescription className="space-y-4 my-3.5">
                                                        <div className="space-y-1.5">
                                                            <Label>Name</Label>
                                                            <Input value={name ? name : ""} onChange={(e) => setName(e.target.value)} placeholder="Enter persona name" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label>System Prompt</Label>
                                                            <Textarea value={systemPrompt ? systemPrompt : ""} onChange={(e) => setSystemPrompt(e.target.value)} placeholder="Describe the persona" />
                                                        </div>
                                                    </DialogDescription>
                                                )}
                                                <DialogFooter>
                                                    <Button variant="outline" size="sm" onClick={handleEditPersona}>
                                                        <Send className="mr-1 h-4 w-4" />
                                                        Submit
                                                    </Button>
                                                </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
