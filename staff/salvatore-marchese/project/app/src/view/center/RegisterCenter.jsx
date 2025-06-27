import { useState } from 'react';
import logic from '../../logic/users/index.js';

export default function Register(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { target: formElement } = event;
        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat },
            address: { value: address },
            country: { value: country },
            city: { value: city },
            postcode: { value: postcode },
            telephone: { value: telephone },
        } = formElement;

        try {
            await logic.registerUserCenter(
                name,
                email,
                password,
                passwordRepeat,
                address,
                country,
                city,
                postcode,
                telephone,
            );
            formElement.reset();
            props.onRegistered();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    const handleLoginClick = (event) => {
        event.preventDefault();
        props.onLoginClick();
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
                    Register as <span className="text-yellow-500">Dive Center</span>
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    {/* Password Field */}
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
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                            {showPassword ? '👁️' : '🔒'}
                        </span>
                    </div>

                    {/* Repeat Password Field */}
                    <div className="relative">
                        <label htmlFor="password-repeat" className="block text-sm font-medium">
                            Repeat Password
                        </label>
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            id="password-repeat"
                            name="password-repeat"
                            className="w-full p-2 pr-10 border rounded-md"
                        />
                        <span
                            onClick={() => setShowRepeatPassword((prev) => !prev)}
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                            {showRepeatPassword ? '👁️' : '🔒'}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium">
                            Country
                        </label>
                        <input
                            id="country"
                            name="country"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium">
                            City
                        </label>
                        <input
                            id="city"
                            name="city"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="postcode" className="block text-sm font-medium">
                            Postcode
                        </label>
                        <input
                            id="postcode"
                            name="postcode"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium">
                            Telephone
                        </label>
                        <input
                            id="telephone"
                            name="telephone"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto mt-4 bg-blue-500 text-yellow-400 py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">Already have an account?</p>
                <a
                    href="#"
                    onClick={handleLoginClick}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Login
                </a>
            </div>
        </main>
    );
}