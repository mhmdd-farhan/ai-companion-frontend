import { useQuery } from "@tanstack/react-query"
import { getAllUser, getUserChat } from "./user-client"


export const useUserQueries = () => {
    const useUserChat = (user_id: string) =>
        useQuery({
            queryKey: ["userChat", user_id],
            queryFn: () => getUserChat(user_id),
            enabled: !!user_id
        })

    const useAllUser = () =>
        useQuery({
            queryKey: ["allUser"],
            queryFn: () => getAllUser()
        })

    return {
        useUserChat,
        useAllUser
    }
}