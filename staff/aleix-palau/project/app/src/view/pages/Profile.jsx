import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { PrimaryButton, ArtistTag } from '../library'
import { useAutoResizeTextarea } from '../../hooks'
import { PictureUpload, Spinner } from '../components'
import { calculateAge, orderArtists } from '../../util'

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

    const { textareaRef } = useAutoResizeTextarea(bio, 72)

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
                setIsLoading(false)
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

    if (isLoading) return <Spinner />

    return (
        <div className="max-w-2xl mx-auto p-3 bg-lightest">
            <h1 className="text-2xl font-bold mb-5 text-darkest-blue">Profile</h1>

            <section className="space-y-5">
                {/* Profile Section */}
                <div className="flex-col items-center justify-items-center space-y-2">
                    <img
                        src={pictures[0] || '/images/default-profile.jpeg'}
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
                        ref={textareaRef}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="About me..."
                        className="w-full resize-none outline-none text-dark-blue placeholder-dark-blue/60"
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
                    <div className="flex flex-wrap gap-1.5">
                        {orderArtists(artists).map((artist, index) => (
                            <ArtistTag key={index} className="bg-skin">
                                {artist}
                            </ArtistTag>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <PrimaryButton
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    className="mb-4 bg-pink"
                >Save Changes</PrimaryButton>
            </section>
        </div>
    )
}