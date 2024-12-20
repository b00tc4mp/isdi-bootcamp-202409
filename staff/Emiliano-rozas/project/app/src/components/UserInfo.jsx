import React, { useEffect, useState } from 'react'
import logic from '../logic/index'
import { errors } from 'com'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { SystemError } = errors

export default function UserInfo() {
    const [userProfile, setUserProfile] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false) // Estado para manejar el submit

    useEffect(() => {
        const userInfo = async () => {
            try {
                const userData = await logic.getUserProfile()
                setUserProfile(userData)
            } catch (error) {
                console.error(error)
            }
        }
        userInfo()
    }, [])

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        const { target: form } = event

        const {
            phone: { value: phone },
            street: { value: street },
            city: { value: city },
            country: { value: country },
            postalCode: { value: postalCode },
        } = form

        setIsSubmitting(true) // para que se vea el sumiting

        try {
            await logic.updateUserProfile(street, phone, city, country, postalCode)

            toast.success('Profile Updated!', { autoClose: 3000 })

            const updatedProfile = await logic.getUserProfile()

            setUserProfile(updatedProfile) //  datos actualizados
        } catch (error) {
            if (error instanceof SystemError) alert('Sorry, try again later.')

            else alert(error.message)

            console.error(error)
        } finally {
            setIsSubmitting(false) // Deshabilitar estado de carga
        }
    }

    return (
        <form className="flex flex-col w-full space-y-4" onSubmit={onSubmitHandler}>
            {/* Sección de información básica */}
            <div>
                <ToastContainer />
                <h2 className="text-xl font-bold text-green-500 mb-4">User Information</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-1 text-sm">Username</label>
                    <input
                        defaultValue={userProfile.username || ""}
                        id="username"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-sm">Name</label>
                    <input
                        defaultValue={userProfile.name || ""}
                        id="name"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm">Email</label>
                    <input
                        defaultValue={userProfile.email || ""}
                        id="email"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="email"
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1 text-sm">Phone</label>
                    <input
                        defaultValue={userProfile.phone || ""}
                        id="phone"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
            </div>

            {/* Sección de dirección */}
            <div>
                <h2 className="text-xl font-bold text-green-500 mb-4">Address</h2>
                <div className="mb-4">
                    <label htmlFor="street" className="block mb-1 text-sm">Street</label>
                    <input
                        defaultValue={userProfile.street || ""}
                        id="street"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        placeholder="Enter your street"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block mb-1 text-sm">City</label>
                    <input
                        defaultValue={userProfile.city || ""}
                        id="city"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        placeholder="Enter your city"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block mb-1 text-sm">Country</label>
                    <input
                        defaultValue={userProfile.country || ""}
                        id="country"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        placeholder="Enter your country"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="postalCode" className="block mb-1 text-sm">Postal Code</label>
                    <input
                        defaultValue={userProfile.postalCode || ""}
                        id="postalCode"
                        className="w-full px-3 py-2 rounded border border-green-700 bg-black text-white"
                        type="text"
                        placeholder="Enter your postal code"
                        required
                    />
                </div>
                <button
                    className={`bg-green-700 text-white px-8 py-2 rounded-md border border-white font-light ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Updating..." : "SUBMIT"}
                </button>
            </div>
        </form>
    )
}
