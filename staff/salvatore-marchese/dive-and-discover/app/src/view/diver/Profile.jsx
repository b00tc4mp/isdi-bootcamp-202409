import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../library'
import logic from '../../logic/users'

import { extractPayloadFromJWT } from '../../util';

const FormField = ({ fieldKey, label, value, onChange }) => {
    return (
        <>
            <label htmlFor={fieldKey} className="block text-sm font-semibold mb-1">{label}
            </label>
            <input type="text" id={fieldKey} name={fieldKey} value={value} onChange={onChange} className="w-full p-2 border rounded-md" />
        </>
    )
}

const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: ''/* , wetSuit: '', weight: '', tank: '', finns: '' */})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    //fetching user data
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await logic.getUser()
                if (userData?.error) throw new Error(data.error)

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
        try {
            //const user = extractPayloadFromJWT(sessionStorage.token);
            //await logic.updateUser(user.sub, userInfo);
            await logic.updateUserProfile(userInfo);
            alert('Information updated successfully')
            navigate('/home')
        } catch (error) {
            setError('Error updating information')
        }
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div className="flex justify-center items-center p-16 mt-4" >
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-center max-w-md">
                <form className="w-full  bg-white p-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Personal Info  */}
                    <div className='mb-8'>
                        <p className="text-xl font-semibold text-blue-700 cursor-pointer transition-all hover:text-black">
                            Personal Info
                        </p>
                        <div>
                            <FormField fieldKey="name" label={"Name"} value={userInfo.name} onChange={handleChange} />

                            {/* <FormField fieldKey="email" label={"Email Address"} value={userInfo.email} onChange={handleChange} /> BUILD UP A RECOVERY EMAIL AND PASSWORD IN COMPONENTS*/}

                            <FormField fieldKey="wet_suit" label={"Wet Suit"} value={userInfo.wetSuit} onChange={handleChange} />

                            <FormField fieldKey="weight" label={"Weight"} value={userInfo.weight} onChange={handleChange} />

                            <FormField fieldKey="tankSize" label={"Tank"} value={userInfo.tankSize} onChange={handleChange} />

                            <FormField fieldKey="finns" label={"Finns"} value={userInfo.finns} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex justify-between mt-2">
                        <button type="submit" className="h-12 w-[150px] bg-blue-600 text-sm text-yellow-400 rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}                                                                                                                                                   

export default Profile;