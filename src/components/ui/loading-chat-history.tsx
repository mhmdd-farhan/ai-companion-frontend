import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatHistorySkeletonProps {
    count?: number;
}

export const ChatHistorySkeleton: React.FC<ChatHistorySkeletonProps> = ({
    count = 4,
}) => {
    return (
        <div className="space-y-2">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="p-3 rounded-xl border border-chat-border space-y-2 animate-pulse"
                >
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="h-3 w-28" />
                </div>
            ))}
        </div>
    );
};
