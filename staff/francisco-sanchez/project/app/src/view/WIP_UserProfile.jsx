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


    return (
        <main className="flex justify-center items-center bg-gray-100 w-full h-full py-8">
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-4xl">
                <div className="flex flex-col items-center mb-6">
                    {/* Imagen de perfil */}
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User profile"
                        className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover cursor-pointer hover:opacity-90 transition"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">User Profile</h2>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleUpdateClick}>
                    {userData ? (
                        <>
                            <Field>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" defaultValue={userData.username} placeholder="Your username" />
                            </Field>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={userData.email} placeholder="Your email" />
                            </Field>
                            <Field>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" defaultValue={userData.name} placeholder="Your name" />
                            </Field>
                            <Field>
                                <Label htmlFor="surname1">Surname</Label>
                                <Input id="surname1" type="text" defaultValue={userData.surname1} placeholder="Your surname" />
                            </Field>
                            <Field>
                                <Label htmlFor="surname2">Surname 2</Label>
                                <Input id="surname2" type="text" defaultValue={userData.surname2} placeholder="Your second surname" />
                            </Field>
                            <Field>
                                <Label htmlFor="dni">DNI</Label>
                                <Input id="dni" type="text" defaultValue={userData.dni} placeholder="Your DNI" />
                            </Field>
                            <Field className="md:col-span-2">
                                <Label htmlFor="biography">Biography</Label>
                                <Textarea id="biography" defaultValue={userData.biography} placeholder="Write something about yourself" />
                            </Field>
                            <Field>
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" type="text" defaultValue={userData.country} placeholder="Your country" />
                            </Field>
                            <Field>
                                <Label htmlFor="province">Province</Label>
                                <Input id="province" type="text" defaultValue={userData.province} placeholder="Your province" />
                            </Field>
                            <Field>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" type="text" defaultValue={userData.city} placeholder="Your city" />
                            </Field>
                            <Field>
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input id="postalCode" type="text" defaultValue={userData.postalCode} placeholder="Your postal code" />
                            </Field>
                            <Field>
                                <Label htmlFor="address1">Address 1</Label>
                                <Input id="address1" type="text" defaultValue={userData.address1} placeholder="Your address" />
                            </Field>
                            <Field>
                                <Label htmlFor="address2">Address 2</Label>
                                <Input id="address2" type="text" defaultValue={userData.address2} placeholder="Apartment, suite, etc." />
                            </Field>
                            <Field>
                                <Label htmlFor="number">Number</Label>
                                <Input id="number" type="text" defaultValue={userData.number} placeholder="Building number" />
                            </Field>
                            <Field>
                                <Label htmlFor="flat">Flat</Label>
                                <Input id="flat" type="number" defaultValue={userData.flat} placeholder="Flat number" />
                            </Field>
                            <Field>
                                <Label htmlFor="legalName">Legal Name</Label>
                                <Input id="legalName" type="text" defaultValue={userData.legalName} placeholder="Your legal name" />
                            </Field>
                            <Field>
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" type="url" defaultValue={userData.website} placeholder="Your website" />
                            </Field>
                            <div className="flex gap-4 md:col-span-2 justify-center">
                                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Update Profile</Button>
                                <Button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={handleCancelButton}>Cancel</Button>
                            </div>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </form>
            </div>
        </main>
    )
}