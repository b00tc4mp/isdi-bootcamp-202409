import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from '../library'
import logic from '../../logic/users'

import { extractPayloadFromJWT } from "../../util";

const FormField = ({ fieldKey, label, value, onChange }) => {
    return (
        <>
            <label htmlFor={fieldKey} className="block text-sm font-semibold mb-1">{label}
            </label>
            <input type="text" id={fieldKey} name={fieldKey} value={value} onChange={onChange} className="w-full p-2 border rounded.md" />
        </>
    )
}

const ProfileCenter = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '', country: '', city: '', postcode: '', openingHours: [] })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    //openingHours, setOpeningHours
    const [form, setForm] = useState({});
    const fields = [1, 2, 3, 4, 5, 6, 7];

    //fetching user data
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await logic.getUserCenter()
                if (userData?.error) throw new Error(userData.error)
                setUserInfo({
                    ...userData,
                    openingHours: userData.openingHours || [], // Ensure it is an array
                });

                transformOpeningHours(userData.openingHours || []);
                setIsLoading(false)
            } catch (error) {
                console.log(err)
                console.log(Object.keys(error))
                if (error?.authError) {
                    sessionStorage.token = null
                    navigate('/login')
                }
                alert(error.message)
                setError('Error fetching user data')
                setIsLoading(false)
            }
        }
        fetchUserInfo()
    }, [])


    const transformOpeningHours = (openingHours) => {
        const formData = openingHours.reduce((acc, { day, openTime, closeTime }) => {
            acc[day] = { openTime, closeTime };
            return acc;
        }, {});
        setForm(formData)
    }

    const getDayString = (day) => {
        if (day === 1) return "Monday";
        else if (day === 2) return "Tuesday";
        else if (day === 3) return "Wednesday";
        else if (day === 4) return "Thursday";
        else if (day === 5) return "Friday";
        else if (day === 6) return "Saturday";
        else if (day === 7) return "Sunday";
    }



    //handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            const user = extractPayloadFromJWT(sessionStorage.token);

            const openingHours = Object.entries(form).map(([day, times]) => ({
                day: parseInt(day, 10),
                ...times
            }))

            userInfo['openingHours'] = openingHours;
            console.log(userInfo)

            await logic.updateProfileCenter(user.sub, userInfo)
            alert('Information updated successfully')
            navigate('/home')
        } catch (error) {
            setError('Error updating information')
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }


    if (isLoading) return <p>Loading...</p>
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md">
                <form className="w-full bg-white p-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Center Personal Info*/}
                    <div className="mb-8">
                        <p className="text-xl font-semibold text-blue-700 cursor-pointer trasition-all hover:text-black">Business Info</p>
                        <div>
                            <FormField fieldKey="name" label={"Name"} value={userInfo.name} onChange={handleChange} />

                            <FormField fieldKey="email" label={"Email Address"} value={userInfo.email} onChange={handleChange} />

                            <FormField fieldKey="address" label={"Address"} value={userInfo.address} onChange={handleChange} />

                            <FormField fieldKey="country" label={"Country"} value={userInfo.country} onChange={handleChange} />

                            <FormField fieldKey="city" label={"City"} value={userInfo.city} onChange={handleChange} />

                            <FormField fieldKey="postcode" label={"Postcode"} value={userInfo.postcode} onChange={handleChange} />

                            <p className="text-xl font-semibold text-blue-700 cursor-pointer transition-all hover:text-black mb-4">
                                Business Hours
                            </p>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-2 gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
                                    >
                                        <FormField
                                            fieldKey={`openTime-${index}`}
                                            label={`Opening Time (Day ${getDayString(field)})`}
                                            placeholder="Opening"
                                            value={form[field]?.openTime || ""}
                                            onChange={(e) => {
                                                let val = form[field] || {};
                                                val["openTime"] = e.target.value;
                                                updateForm({ [`${field}`]: val });
                                            }}
                                            className="w-full"
                                        />
                                        <FormField
                                            fieldKey={`closeTime-${index}`}
                                            label={`Closing Time (Day ${getDayString(field)})`}
                                            placeholder="Closing"
                                            value={form[field]?.closeTime || ""}
                                            onChange={(e) => {
                                                let val = form[field] || {};
                                                val["closeTime"] = e.target.value;
                                                updateForm({ [`${field}`]: val });
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-between mt-2">
                        <Button type="submit" className={`h-12 w-[150px] ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-600"
                            } text-sm text-white rounded-lg transition-all`}
                            disabled={isSubmitting}> {isSubmitting ? "Saving..." : "Save"} </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileCenter