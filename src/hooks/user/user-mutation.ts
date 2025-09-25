import { useMutation } from "@tanstack/react-query"
import { loginUser } from "./user-client"

export const useUserMutation = () => {
    const useLoginMutation = () =>
        useMutation({
            mutationKey: ["login"],
            mutationFn: (name: string) => loginUser(name),
            onSuccess: () => {
                console.log("Login success")
            }
        })

    return {
        useLoginMutation
    }
} 