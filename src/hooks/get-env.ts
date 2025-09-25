export const getEnv = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const apiKey = import.meta.env.VITE_API_KEY as string;
    return {
        apiKey,
        apiUrl
    }
}