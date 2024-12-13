import React from 'react';
import logic from '../logic';

export default function UserInfo() {

    // const onSubmitHandler = event => {
    //     event.preventDefault()

    //     const { target: form } = event

    //     const {
    //         phone: { value: phone },
    //         street: { value: street },
    //         city: { value: city },
    //         country: { value: country },
    //         postalCode: { value: postalCode },
    //     } = form
    //     try {

    //     }
    // }








    const inputClass =
        'w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 rounded border border-green-700 bg-black text-white placeholder-gray-500';

    return (
        <form className="flex flex-col w-full space-y-4">
            {/* Sección de información básica */}
            <div>
                <h2 className="text-xl font-bold text-green-500 mb-4">User Information</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-1 text-sm">
                        Username
                    </label>
                    <input id="username" className={inputClass} type="text" placeholder="Enter your username" />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-sm">
                        Name
                    </label>
                    <input id="name" className={inputClass} type="text" placeholder="Enter your name" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm">
                        Email
                    </label>
                    <input id="email" className={inputClass} type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1 text-sm">
                        Phone
                    </label>
                    <input id="phone" className={inputClass} type="tel" placeholder="Enter your phone number" />
                </div>
            </div>

            {/* Sección de dirección */}
            <div>
                <h2 className="text-xl font-bold text-green-500 mb-4">Address</h2>
                <div className="mb-4">
                    <label htmlFor="street" className="block mb-1 text-sm">
                        Street
                    </label>
                    <input id="street" className={inputClass} type="text" placeholder="Enter your street" />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block mb-1 text-sm">
                        City
                    </label>
                    <input id="city" className={inputClass} type="text" placeholder="Enter your city" />
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block mb-1 text-sm">
                        Country
                    </label>
                    <input id="country" className={inputClass} type="text" placeholder="Enter your country" />
                </div>
                <div className="mb-4">
                    <label htmlFor="postalCode" className="block mb-1 text-sm">
                        Postal Code
                    </label>
                    <input id="postalCode" className={inputClass} type="text" placeholder="Enter your postal code" />
                </div>
            </div>
        </form>
    );
}
