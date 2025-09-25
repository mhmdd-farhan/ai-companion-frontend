import { getEnv } from "../get-env";

const { apiKey, apiUrl } = getEnv();

interface GetChatResponse {
    message: string;
    data: {
        id: string;
        user_id: string;
        persona_id: number;
        created_at: string;
        Persona: {
            name: string;
        }
    }
}

interface GetAllChatResponse {
    message: string;
    data: {
        id: string;
    }[]
}

interface AddNewChatResponse {
    message: string;
    data: {
        id: string;
        user_id: string;
        persona_id: number;
    }
}

export const getAllChat = async (): Promise<GetAllChatResponse> => {
    const response = await fetch(`${apiUrl}/chats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })
    if (!response.ok) {
        console.error(response.status)
        throw new Error("Get all message failed")
    }
    const chatsData = await response.json();

    return chatsData;
}

export const getChat = async (id: string | undefined): Promise<GetChatResponse> => {
    const response = await fetch(`${apiUrl}/chats/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })
    if (!response.ok) {
        console.error(response.status)
        throw new Error("Get message failed")
    }
    const chatData = await response.json();

    return chatData;
}

export const addNewChat = async (user_id: string, persona_id: number): Promise<AddNewChatResponse> => {
    const response = await fetch(`${apiUrl}/chats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ user_id, persona_id })
    })
    if (!response.ok) {
        throw new Error("Add new chat failed")
    }
    const newChat = await response.json();

    return newChat;
}