import { useMutation } from "@tanstack/react-query"
import { addPersona, editPersona } from "./persona-client";

interface PersonaProps {
    id?: number | null;
    name: string;
    systemPrompt: string;
}

export const usePersonasMutation = () => {
    const usePersonaMutation = () =>
        useMutation({
            mutationKey: ["personaMutation"],
            mutationFn: ({ name, systemPrompt }: PersonaProps) => addPersona(name, systemPrompt)
        })

    const useEditPersonaMutation = () =>
        useMutation({
            mutationKey: ["editPersona"],
            mutationFn: ({ id, name, systemPrompt }: PersonaProps) => editPersona(id, name, systemPrompt)
        })

    return {
        usePersonaMutation,
        useEditPersonaMutation
    }
}