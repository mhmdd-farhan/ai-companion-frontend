import { Button } from '@/components/ui/button';
import { useUserMutation } from '@/hooks/user/user-mutation'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner';

export default function LoginForm() {
    const { useLoginMutation } = useUserMutation();
    const loginMutation = useLoginMutation();
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!name.trim()) {
            setMessage('Give a name to start chat!')
            return
        }
        try {
            const userData = await loginMutation.mutateAsync(name);
            localStorage.setItem("user_id", userData.data.user_id);
            setMessage(`Halo ${name}, login sucess!`)
            toast("Login sucess")
            setName('')
            navigate(`/${userData.data.chat_id}`)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast("Login failed try again")
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <Button
                    type="submit"
                    className="relative w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    disabled={loginMutation.isPending}
                >
                    <span className="z-10">{loginMutation.isPending ? "Login..." : "Login"}</span>
                </Button>
            </form>

            {message && (
                <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
            )}
        </div>
    )
}
