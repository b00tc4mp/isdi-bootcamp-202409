import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../logic/users/loginUser';

import { errors } from '../../../com';

const { SystemError } = errors;

export default function Login(_props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {
            target: {
                email: { value: email },
                password: { value: password },
            },
        } = event;

        try {
            await loginUser(email, password);
            event.target.reset();
            navigate('/home');
        } catch (error) {
            console.error(error);
            if (error instanceof SystemError) {
                alert('Sorry, try again later.');
            } else {
                alert(error.message);
            }
        }
    };

    const handleRoleSelection = (event) => {
        event.preventDefault();
        navigate('/select-role-type');
    };

    return (
        <main
            className="flex flex-col justify-center items-center min-h-screen"
            style={{
                backgroundImage:
                    "url('https://www.treehugger.com/thmb/OLxBN3vbTzvgFCeUdlyIMXxu_M8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1279110759-d280cdc3b0b842c2bde02b8e5f7238a8.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-gray-100 shadow-md p-6 rounded-lg max-w-md w-[90%] sm:w-[600px]">
                <h2 className="text-2xl font-bold text-center mb-5">
                    Let's <span className="text-yellow-500">Dive</span> you <span className="text-yellow-500">in</span>
                </h2>
                <p className="text-center mb-7 text-blue-600">
                    Discover the World <span className="block">with Every Sign In 🤿</span>
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="w-full p-2 pr-10 border rounded-md"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                            {showPassword ? '👁️' : '🔒'}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-yellow-500 py-2 px-4 rounded-md hover:bg-blue-600 w-full sm:w-[200px] mx-auto"
                    >
                        Login
                    </button>
                </form>

                {/* Ensure the message and button are stacked */}
                <div className="flex flex-col items-center gap-2 mt-4">
                    <p className="text-center text-gray-600">I don't have an account?</p>
                    <button
                        onClick={handleRoleSelection}
                        className="bg-yellow-500 text-blue-600 py-2 px-4 rounded-md hover:bg-yellow-600 w-full sm:w-[200px] mx-auto"
                    >
                        Register
                    </button>
                </div>
            </div>
        </main>
    );
}