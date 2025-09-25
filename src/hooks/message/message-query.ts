import { useQuery } from "@tanstack/react-query"
import { getAllMessage, getMessage } from "./message-client"

export const useMessageQueries = () => {
    const useMessage = (chatId: string | undefined) =>
        useQuery({
            queryKey: ["message", chatId],
            queryFn: () => getMessage(chatId),
            enabled: !!chatId
        })

    const useAllMessage = () =>
        useQuery({
            queryKey: ["message"],
            queryFn: () => getAllMessage()
        })

    return {
        useMessage,
        useAllMessage
    }
}