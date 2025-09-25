import { useEffect, useState } from "react";


export const useUserId = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            setUserId(user_id);
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        setUserId,
        userId
    }
}