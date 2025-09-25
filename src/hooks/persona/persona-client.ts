import { getEnv } from "../get-env"

const { apiKey, apiUrl } = getEnv();

interface MessageItem {
    id: number;
}

interface Chat {
    id: string;
    created_at: Date;
    user_id: string;
    persona_id: number;
    message_items: MessageItem[];
}

interface Persona {
    id: number;
    name: string;
    systemPrompt: string;
    chats: Chat[];
}

interface AddPersonaResponse {
    message: string;
    data: {
        persona_name: string;
    }
}

interface EditPersonaResponse {
    message: string;
    data: {
        name: string;
        systemPrompt: string;
        id: number;
    }
}

interface GetAllPersonaResponse {
    message: string;
    data: Persona[]
}

interface GetPersonaResonse {
    message: string;
    data: Persona;
}

export const addPersona = async (name: string, systemPrompt: string): Promise<AddPersonaResponse> => {
    const response = await fetch(`${apiUrl}/personas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ name, systemPrompt })
    })
    if (!response.ok) {
        throw new Error("Add persona failed")
    }

    const personaData = await response.json();

    return personaData;
}

export const editPersona = async (
    id: number | null | undefined,
    name: string,
    systemPrompt: string
): Promise<EditPersonaResponse> => {
    const response = await fetch(`${apiUrl}/personas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ name, systemPrompt })
    })
    if (!response.ok) {
        throw new Error("Edit persona failed")
    }

    const personaData = await response.json();

    return personaData;
}

export const getAllPersona = async (): Promise<GetAllPersonaResponse> => {
    const response = await fetch(`${apiUrl}/personas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })
    if (!response.ok) {
        throw new Error("Get all persona failed")
    }
    const personaData = await response.json();

    return personaData;
}

export const getPersona = async (id: number | null): Promise<GetPersonaResonse> => {
    const response = await fetch(`${apiUrl}/personas/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })
    if (!response.ok) {
        throw new Error("Get persona failed")
    }
    const personaData = await response.json();

    return personaData;
}