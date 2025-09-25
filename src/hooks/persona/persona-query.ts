import { useQuery } from "@tanstack/react-query"
import { getAllPersona, getPersona } from "./persona-client"

export const usePersonasQueries = () => {
    const useAllPersona = () =>
        useQuery({
            queryKey: ["personas"],
            queryFn: () => getAllPersona()
        })

    const usePersona = (id: number | null) =>
        useQuery({
            queryKey: ["persona", id],
            queryFn: () => getPersona(id),
            enabled: !!id
        })

    return {
        useAllPersona,
        usePersona
    }
}