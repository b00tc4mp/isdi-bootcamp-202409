import { useState, useEffect } from 'react'
import logic from '../../logic'
import { FaEdit, FaPlus } from 'react-icons/fa'

export default function Profile() {
    const [userName, setUserName] = useState('')
    const [dob, setDob] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [artists, setArtists] = useState([])
    const [profilePic, setProfilePic] = useState('')

    useEffect(() => {
        async function fetchUserData() {
            try {
                const name = await logic.getUserName()
                const { dob, artists, bio, location, profilePic } = await logic.getUserProfile()
                setUserName(name)
                setDob(dob)
                setArtists(artists)
                setBio(bio)
                setLocation(location)
                setProfilePic(profilePic)
            } catch (error) {
                console.error('Failed to load user data:', error)
            }
        }
        fetchUserData()
    }, [])

    const calculateAge = (dob) => {
        const birthDate = new Date(dob)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDifference = today.getMonth() - birthDate.getMonth()
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    const handleAddPhoto = () => {
        // Logic to add photo
        console.log('Add photo')
    }

    const handleEditArtists = () => {
        // Logic to edit artists
        console.log('Edit artists')
    }

    return (
        <div className="p-4">
            <div className="flex flex-col items-center">
                <img
                    src={profilePic || 'https://via.placeholder.com/150'}
                    alt="Profile Picture"
                    className="rounded-full w-32 h-32 object-cover mb-4"
                />
                <button className="text-purple-500" onClick={handleAddPhoto}>
                    <FaPlus /> Add Photo
                </button>
            </div>
            <h1 className="text-2xl text-center font-bold">
                {userName}, {dob ? calculateAge(dob) : 'N/A'}
            </h1>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">About Me</h2>
                <textarea
                    className="border w-full p-2 mt-2"
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write a short bio..."
                />
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Location</h2>
                <input
                    className="border w-full p-2 mt-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                />
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Favorite Artists</h2>
                <ul className="list-disc pl-5">
                    {artists.map((artist, index) => (
                        <li key={index}>{artist}</li>
                    ))}
                </ul>
                <button className="text-purple-500 mt-2" onClick={handleEditArtists}>
                    <FaEdit /> Edit Artists
                </button>
            </div>
        </div>
    )
}