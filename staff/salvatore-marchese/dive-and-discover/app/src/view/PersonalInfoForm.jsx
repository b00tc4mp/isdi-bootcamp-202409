import { useState, useEffect } from 'react'
import { Button } from './library'
import logic from '../../../api/logic'

const PersonalInfoForm = () => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: ''})

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    //fetching user data
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await logic.getUserInfo()
                setUserInfo(userData)
                setIsLoading(false)
            } catch (error) {
                setError('Error fetching user data')
                setIsLoading(false)
            }
        }

        fetchUserInfo()
    }, [])

    //handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({...userInfo, [name]: value })
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await logic.updateUserInfo(userInfo)
            alert('Information updated succefully')
        } catch (error) {
            setError('Error updating information')
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-gray-50 overflow-hidden p-4">
            <h1 className="text-xl font-bold text-center mb-5">Manage Personal Information</h1>

            <form className="w-full max-w-md bg-white p-6 shadow-md rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                    <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} className="w-full p-2 border rounded-md" />

                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} className="w-full p-2 border rounded-md" /> 

                    <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                    <input type="text" id="password" name="password" value={userInfo.password} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <Button type="submit">Save Changes</Button>
            </form>
        </main>
    )  
}

export default PersonalInfoForm