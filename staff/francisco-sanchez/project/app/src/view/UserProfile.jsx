import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image, Textarea } from '../library'
import { useEffect, useState } from 'react'

export default function UserProfile(props) {
    console.log('Login -> render')
    const [userData, setUserData] = useState(null)

    const fetchData = () => {
        if (logic.isUserLoggedIn()) {
            logic.getUserDetails()
                .then((userData) => {
                    setUserData(userData)
                    console.log(userData)
                })
                .catch((error) => {
                    alert(error.message)
                })
        } else {
            setUserData(null)
        }
    }

    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [location.pathname])

    const { alert, confirm } = useContex()

    const handleCancelButton = event => {
        event.preventDefault()

        confirm('Do you want to cancel editing?', accepted => {
            if (accepted) {
                props.onProfileCancel()
            }
        }, 'warn')
    }

    const handleUpdateClick = event => {
        event.preventDefault()

        const { target: form } = event
        const {
            username: { value: username },
            email: { value: email },
            name: { value: name },
            surname1: { value: surname1 },
            surname2: { value: surname2 },
            dni: { value: dni },
            biography: { value: biography },
            country: { value: country },
            province: { value: province },
            city: { value: city },
            postalCode: { value: postalCode },
            address1: { value: address1 },
            address2: { value: address2 },
            number: { value: number },
            flat: { value: flat },
            legalName: { value: legalName },
            website: { value: website },
        } = form

        try {
            logic.updateUser(userData._id, userData._id, username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website)
                .then(() => {
                    props.onProfileUpdated()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, there was a problem, try it again later')
                    else
                        alert(error.message)
                })

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }


    return <main className="flex flex-col items-center justify-center bg-color_backgroundGrey w-full h-screen">
        <h1 className="text-3xl font-bold text-color_primary mb-4">Hourify</h1>

        {/* Container to center content */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <div className="flex flex-col items-center">

                <img src="https://via.placeholder.com/40" alt="User profile" className="w-40 h-40 rounded-full border-2 border-white cursor-pointer" />

                <h2 className="text-2xl font-bold text-color_darkBlue mb-4">User Profile</h2>

                <form className="flex flex-col gap-4 w-full" onSubmit={handleUpdateClick}>
                    {userData ? (
                        <>
                            <Field>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" defaultValue={userData.username} placeholder="Your username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" defaultValue={userData.email} placeholder="Your email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" defaultValue={userData.name} placeholder="Your name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="surname1">Surname</Label>
                                <Input type="text" id="surname1" defaultValue={userData.surname1} placeholder="Your surname 1" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="surname2">Surname 2</Label>
                                <Input type="text" id="surname2" defaultValue={userData.surname2} placeholder="Your surname 2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="dni">DNI</Label>
                                <Input type="text" id="dni" defaultValue={userData.dni} placeholder="00000000H" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="biography">Biography</Label>
                                <Textarea id="biography" defaultValue={userData.biography} placeholder="Show your best here"></Textarea>
                            </Field>
                            <Field>
                                <Label htmlFor="country">Country</Label>
                                <Input type="text" id="country" defaultValue={userData.country} placeholder="Your country" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="province">Province</Label>
                                <Input type="text" id="province" defaultValue={userData.province} placeholder="Your province or state" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="city">City</Label>
                                <Input type="text" id="city" defaultValue={userData.city} placeholder="Your city" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input type="text" id="postalCode" defaultValue={userData.postalCode} placeholder="00000Y" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="address1">Address 1</Label>
                                <Input type="text" id="address1" defaultValue={userData.address1} placeholder="street, square, ... " className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="address2">Address 2</Label>
                                <Input type="text" id="address2" defaultValue={userData.address2} placeholder="Stair, apartment, neighbourhood, studio...  " className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="number">number</Label>
                                <Input type="text" id="number" defaultValue={userData.number} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="flat">Flat</Label>
                                <Input type="number" id="flat" defaultValue={userData.flat} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="legalName">Legal Name</Label>
                                <Input type="text" id="legalName" defaultValue={userData.legalName} placeholder="Your company name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>
                            <Field>
                                <Label htmlFor="website">Website</Label>
                                <Input type="url" id="website" defaultValue={userData.website} placeholder="Your company name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary" />
                            </Field>

                            <Button type="submit" className="bg-color_primary text-white px-4 py-2 rounded-md hover:bg-color_primaryHover transition">Update profile</Button>
                            <Button className="bg-color_softRed text-white px-4 py-2 rounded-md hover:bg-red-800 transition" onClick={handleCancelButton}>Cancel</Button>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}

                </form>
            </div>
        </div>
    </main>
}