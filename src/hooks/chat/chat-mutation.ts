import { useMutation } from "@tanstack/react-query"
import { addNewChat } from "./chat-client";

interface AddChatProps {
    user_id: string;
    persona_id: number;
}

export const useChatsMutation = () => {
    const useChatMutation = () =>
        useMutation({
            mutationKey: ["chatMutation"],
            mutationFn: ({ user_id, persona_id }: AddChatProps) => addNewChat(user_id, persona_id),
            onSuccess: () => {
                console.log("Create new chat success")
            }
        })

    return {
        useChatMutation
    }
}