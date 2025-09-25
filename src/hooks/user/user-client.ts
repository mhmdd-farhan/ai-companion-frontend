import { getEnv } from "../get-env"

const { apiUrl, apiKey } = getEnv();

interface LoginResponse {
    message: string;
    data: {
        user_id: string,
        chat_id: string
    }
}

interface GetAllUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        created_at: string;
    }[]
}

interface GetUserChatResponse {
    message: string;
    data: {
        id: number;
        user_id: string;
        persona_id: number;
        created_at: string;
        message_items: {
            content: string
        }[]
        Persona: {
            name: string;
        }
    }[]
}

export const loginUser = async (name: string): Promise<LoginResponse> => {

    const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        console.error(response.status)
        throw new Error("Add user failed")
    }

    const userData = await response.json();

    return userData;
}

export const getAllUser = async (): Promise<GetAllUserResponse> => {
    const response = await fetch(`${apiUrl}/users`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    });

    if (!response.ok) {
        console.error(response.status)
        throw new Error("Get all user failed")
    }

    const users = await response.json();

    return users;
}

export const getUserChat = async (user_id: string): Promise<GetUserChatResponse> => {
    const response = await fetch(`${apiUrl}/users/chat/${user_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    });

    if (!response.ok) {
        console.error(response.status)
        throw new Error("Get user chat failed")
    }

    const userChatData = await response.json();

    return userChatData;
}