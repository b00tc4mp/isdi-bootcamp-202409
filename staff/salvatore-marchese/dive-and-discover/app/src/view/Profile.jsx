import { useState, useEffect } from 'react'
import { Button } from './library'
import logic from '../logic/users'

import { extractPayloadFromJWT } from '../util';

const FormField = ({ filedKey, label, value, onChange }) => {
    return (
        <>
            <label htmlFor={filedKey} className="block text-sm font-semibold mb-1">
                {label}
            </label>
            <input type="text" id={filedKey} name={filedKey} value={value} onChange={onChange} className="w-full p-2 border rounded-md" />
        </>
    )
}

const Profile = () => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    //fetching user data
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await logic.getUser();
                if (userData?.error) throw new Error(data.error)

                console.log(userData)
                setUserInfo(userData)
                setIsLoading(false)
            } catch (error) {
                console.log(Object.keys(error))
                if (error?.authError) {
                    //clear the localstorage
                    sessionStorage.token = null;
                    navigate('/login')
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
        setUserInfo({ ...userInfo, [name]: value })
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(userInfo)

        try {
            const user = extractPayloadFromJWT(sessionStorage.token);
            await logic.updateUser(user.sub, userInfo)
            alert('Information updated succefully')
        } catch (error) {
            setError('Error updating information')
        }
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md">
                <form className="w-full  bg-white p-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Personal Info  */}
                    <div className='mb-8'>
                        <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
                            Personal Info
                        </p>
                        <div>
                            <FormField filedKey="name" label={"Name"} value={userInfo.name} onChange={handleChange} />
                            <FormField filedKey="email" label={"Email Address"} value={userInfo.email} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Diver Info  */}
                    {/*                     <div>
                        <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
                            Diver Info
                        </p>
                        <div>
                            <FormField filedKey="wet_suit" label={"Wet Suit"} value={userInfo.wet_suit} onChange={handleChange} />
                            <FormField filedKey="weight" label={"Weight"} value={userInfo.weight} onChange={handleChange} />
                            <FormField filedKey="tank" label={"Tank"} value={userInfo.tank} onChange={handleChange} />
                            <FormField filedKey="finns" label={"Finns"} value={userInfo.finns} onChange={handleChange} />
                        </div>
                    </div> */}
                    <div className="flex justify-between mt-2">
                        <Button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;