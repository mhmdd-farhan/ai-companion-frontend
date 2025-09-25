import type { Message } from "@/components/ChatMessage";
import { getEnv } from "../get-env";

const { apiKey, apiUrl } = getEnv();

interface GetAllMessageResponse {
    message: string;
    data: {
        latency: string;
    }[]
}

interface GetMessageResponse {
    message: string;
    data: Message[]
}

interface AddMessageResponse {
    message: string;
    data: {
        id: string;
        reply: string;
        latency: string;
    }
}

export const getAllMessage = async (): Promise<GetAllMessageResponse> => {
    const response = await fetch(`${apiUrl}/messages`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })

    if (!response.ok) {
        throw new Error("Failed to load all messages")
    }

    const messagesData = await response.json();

    return messagesData;
}

export const getMessage = async (chatId: string | undefined): Promise<GetMessageResponse> => {
    const response = await fetch(`${apiUrl}/messages/${chatId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    })

    if (!response.ok) {
        throw new Error("Failed to load messages")
    }

    const messagesData = await response.json();

    return messagesData;
}

export const addMessage = async (content: string, chat_id: string): Promise<AddMessageResponse> => {
    const response = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ content, chat_id })
    })

    if (!response.ok) {
        throw new Error("Failed to add message")
    }

    const messageData = await response.json();

    return messageData;
}