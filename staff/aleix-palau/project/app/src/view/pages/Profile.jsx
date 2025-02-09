import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { calculateAge } from '../../util'
import { PictureUpload } from '../components'

const { SystemError } = errors

export default function Profile() {
    const { alert, confirm } = useContext()

    const [name, setName] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [artists, setArtists] = useState([])
    const [pictures, setPictures] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        logic.getUserProfile()
            .then(profile => {
                setName(profile.name)
                setDateOfBirth(profile.dateOfBirth)
                setBio(profile.bio || '')
                setLocation(profile.location || '')
                setArtists(profile.artists || [])
                setPictures(profile.pictures || [])
                setIsLoading(false)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }, [])

    const handleUpdateProfile = event => {
        event.preventDefault()

        const updates = {
            bio: bio,
            location: location
        }

        confirm('Save these changes?', confirmed => {
            if (confirmed) {
                logic.updateUserProfile(updates)
                    .then(() => {
                        alert('Profile updated successfully', 'success')
                    })
                    .catch(error => {
                        alert(error instanceof SystemError ?
                            'Sorry, try again later.' : error.message)
                        console.error(error)
                    })
            }
        }, 'warn')
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

            <section className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src={pictures[0] || '/pages/default-profile.jpg'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-gray-600">
                            {dateOfBirth ? `${calculateAge(dateOfBirth)} years old` : ''}
                        </div>
                    </div>
                </div>

                {/* Photos Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Photos</h2>
                    <PictureUpload
                        existingPictures={pictures}
                        onPicturesUpdate={setPictures}
                    />
                </div>

                {/* About Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">About me</h2>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write something about yourself..."
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>

                {/* Location Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Living in</h2>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add your location"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Artists Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">My Artists</h2>
                    <div className="flex flex-wrap gap-2">
                        {artists.map((artist, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 rounded-full"
                            >
                                {artist}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleUpdateProfile}
                    className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Save Changes
                </button>
            </section>
        </div>
    )
}