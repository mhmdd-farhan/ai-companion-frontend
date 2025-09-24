import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center min-h-screen bg-gray-50", className)}>
            <div className="w-4 h-4 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
