import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Index = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Welcome to the AI Companion <br />
                <span className="font-normal text-gray-600 text-lg">
                    Login to start chat
                </span>
            </h1>

            <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
                <Link to={"/login"}>Login</Link>
            </Button>
        </div>
    );
};

export default Index;
