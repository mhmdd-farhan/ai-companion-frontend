import { useQuery } from "@tanstack/react-query"
import { getAllChat, getChat } from "./chat-client"

export const useChatQueries = () => {
    const useChat = (id: string | undefined) =>
        useQuery({
            queryKey: ["chat", id],
            queryFn: () => getChat(id),
            enabled: !!id
        })

    const useAllChat = () =>
        useQuery({
            queryKey: ["allChat"],
            queryFn: () => getAllChat()
        })

    return {
        useChat,
        useAllChat
    }
}