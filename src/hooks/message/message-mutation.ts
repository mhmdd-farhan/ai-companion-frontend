import { useMutation } from "@tanstack/react-query"
import { addMessage } from "./message-client"

interface AddMessageProps {
    content: string;
    chat_id: string;
}

export const useMessagesMutation = () => {
    const useMessageMutation = () =>
        useMutation({
            mutationKey: ["messageMutation"],
            mutationFn: ({ content, chat_id }: AddMessageProps) => addMessage(content, chat_id)
        })

    return {
        useMessageMutation
    }
}