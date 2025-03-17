import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { PrimaryButton } from '../library'
import { PictureUpload } from '../components'
import { calculateAge } from '../../util'

const { SystemError } = errors

export default function Profile() {
    const { alert } = useContext()

    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [artists, setArtists] = useState([])
    const [pictures, setPictures] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)

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

    const handleUpdateProfile = () => {
        // Prevent duplicate submissions
        if (isUpdating) return

        const updates = { bio, location }
        setIsUpdating(true)

        try {
            logic.updateUserProfile(updates)
                .then(() => {
                    alert(null, 'success', 'Your details were saved')
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
                .finally(() => {
                    setIsUpdating(false)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
            setIsUpdating(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-3 bg-lightest">
            <h1 className="text-2xl font-bold mb-5 text-darkest-blue">Profile</h1>

            <section className="space-y-6">
                {/* Profile Section */}
                <div className="flex-col items-center justify-items-center space-y-2">
                    <img
                        src={pictures[0] || '/pages/default-profile.jpg'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <div className="text-2xl font-bold text-darkest-blue">{name}, {calculateAge(dateOfBirth)}</div>
                    </div>
                </div>

                {/* About Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-darkest-blue">About me</h2>
                    <textarea
                        value={bio}
                        onChange={event => setBio(event.target.value)}
                        placeholder="About me..."
                        className="w-full text-dark-blue"
                        rows="1"
                        disabled={isUpdating}
                    />
                </div>

                {/* Photos Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-darkest-blue">Photos</h2>
                    <PictureUpload
                        existingPictures={pictures}
                        onPicturesUpdate={setPictures}
                        disabled={isUpdating}
                    />
                </div>

                {/* Location Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-darkest-blue">Living in</h2>
                    <input
                        type="text"
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        placeholder="Add your location"
                        className="w-full text-dark-blue"
                        disabled={isUpdating}
                    />
                </div>

                {/* Artists Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-darkest-blue">My Artists</h2>
                    <div className="flex flex-wrap gap-2">
                        {artists.map((artist, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-skin text-dark-blue font-semibold rounded-full"
                            >
                                {artist}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <PrimaryButton
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    className="mb-4"
                >Save Changes</PrimaryButton>
            </section>
        </div>
    )
}
// TODO: skeleton loading => default profile image => fix scrolling => icons del footer com a tuiter, que tinguin un background flash griset, my anthem? => treure duplicate submissions?