import { useState, useEffect } from "react"
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
    const [userInfo, setUserInfo] = useState ({ name: '', email: '', address: '', country: '', city:'', postcode: '', openingHours: [] })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

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
                setIsLoading(false)
            } catch (error) {
                console.log(Object.keys(error))
                if (error?.authError) {
                    sessionStorage.token = null
                    Navigate('/login')
                }
                alert(error.message)
                setError('Error fetching user data')
                setIsLoading(false)
            }
        }
        fetchUserInfo()
    }, [])

    //handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value})
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            const user = extractPayloadFromJWT(sessionStorage.token)
            await logic.updateProfile(user.sub, userInfo)
            alert('Information updated successfully')
        } catch (error) {
            setError('Error updating information')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md">
                <form className="w-full bg-white p-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Center Personal Info*/}
                    <div className="mb-8"><p className="text-xl font-semibold text-blue-700 cursor-pointer trasition-all hover:text-black">Business Info</p>
                    <div>
                        
                            <FormField fieldKey="name" label={"Name"} value={userInfo.name} onChange={handleChange} />

                            <FormField fieldKey="email" label={"Email Address"} value={userInfo.email} onChange={handleChange} />

                            <FormField fieldKey="address" label={"Address"} value={userInfo.address} onChange={handleChange} />

                            <FormField fieldKey="country" label={"Country"} value={userInfo.country} onChange={handleChange} />

                            <FormField fieldKey="city" label={"City"} value={userInfo.city} onChange={handleChange} />

                            <FormField fieldKey="postcode" label={"Postcode"} value={userInfo.postcode} onChange={handleChange} />

                            {userInfo.openingHours?.map((entry, index) => (
  <div key={index} className="flex gap-4">
    <FormField
      fieldKey={`openTime-${index}`}
      label={`Opening Time (Day ${entry.day})`}
      value={entry.openTime || ''}
      onChange={(e) => handleOpeningHourChange(index, 'openTime', e.target.value)}
    />
    <FormField
      fieldKey={`closeTime-${index}`}
      label={`Closing Time (Day ${entry.day})`}
      value={entry.closeTime || ''}
      onChange={(e) => handleOpeningHourChange(index, 'closeTime', e.target.value)}
    />
  </div>
))}

                            {/* <FormField fieldKey="openingHours" label={"Opening Hours"} value={userInfo.openingHours} onChange={handleChange} /> */}
                        </div>
                    </div>

                    <div className="flex justify-between mt-2">
                    <Button type="submit" className={`h-12 w-[150px] ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-600"
                    } text-sm text-white rounded-lg transition-all`}
                    disabled={isSubmitting}> {isSubmitting ? "Saving..." : "Save"} </Button>
                        {/* <Button type="submit" className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                            Save
                        </Button> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileCenter