// import { Input, Button, Form, Field, Label } from './library' // change
import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { calculateAge } from '../../util'

const { SystemError } = errors

export default function Profile() {
    const { alert, confirm } = useContext()

    const [name, setName] = useState(null) // Indicates "we don't have this data yet" versus: '' -> "this field is intentionally empty" 
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [bio, setBio] = useState('') // Avoids the controlled/uncontrolled input warning
    const [location, setLocation] = useState('')
    const [artists, setArtists] = useState([])
    const [pictures, setPictures] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch profile data on component mount
    useEffect(() => {
        try {
            logic.getUserProfile()
                .then(profile => {
                    setName(profile.name)
                    setDateOfBirth(profile.dateOfBirth)
                    setBio(profile.bio || '')
                    setLocation(profile.location || '')
                    setArtists(profile.artists || []) // Default to empty if not set
                    setPictures(profile.pictures || [])
                    setIsLoading(false) // Data loaded, stop showing loading state
                })
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    const handlePictureUpload = event => {
        const pictures = Array.from(event.target.pictures)

        // Convert pictures to base64
        const convertToBase64 = picture => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
                reader.readAsDataURL(picture)
            })
        }

        Promise.all(pictures.map(convertToBase64))
            .then(base64Pictures => {
                try {
                    logic.uploadUserPictures(base64Pictures)
                        .then(({ pictures }) => {
                            setPictures(prevPictures => [...prevPictures, ...pictures])
                            alert("Pictures uploaded successfully!")
                        })
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Sorry, try again later.')
                            else
                                alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            })
            .catch(error => {
                if (error instanceof SystemError)
                    alert('Sorry, try again later.')
                else
                    alert(error.message)
                console.error(error)
            })
    }

    const handleUpdateProfile = event => {
        event.preventDefault()

        const updates = {
            bio: bio,
            location: location
        }

        confirm('Save these changes?', confirmed => {
            if (confirmed) {
                try {
                    logic.updateUserProfile(updates)
                        .then(() => {
                            alert('Profile updated successfully', 'success')
                        })
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Sorry, try again later.')
                            else
                                alert(error.message)
                            console.error(error)
                            form.reset()
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }, 'warn')
    }

    // Only render the main content when not loading
    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            {/* <button onClick={() => window.history.back()}>←</button> */}
            <h1>Edit profile</h1>

            {/* Profile section */}
            <section>
                {/* Main profile picture */}
                <div>
                    <img src={pictures[0] || '/pages/default-profile.jpg'} />
                    <div>{name}, {dateOfBirth ? calculateAge(dateOfBirth) : ''}</div>
                </div>

                {/* Media section */}
                <div>
                    <h2>Photos</h2>
                    <div>
                        {/* Display existing pictures */}
                        {pictures.map((pic, index) => (
                            <div key={index}>
                                <img src={pic} alt={`Upload ${index + 1}`} />
                                <button onClick={() => {/* Add delete functionality */ }}>×</button>
                            </div>
                        ))}

                        {/* Upload buttons */}
                        {[...Array(6 - pictures.length)].map((_, index) => (
                            <div key={`upload-${index}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePictureUpload}
                                    style={{ display: 'none' }}
                                    id={`picture-upload-${index}`}
                                />
                                <label htmlFor={`picture-upload-${index}`}>+</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About section */}
                <div>
                    <h2>About me</h2>
                    <textarea
                        value={bio || ''} // Ensure it's never null
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write something about yourself..."
                    />
                </div>

                {/* Location section */}
                <div>
                    <h2>Living in</h2>
                    <input
                        type="text"
                        value={location || ''}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add your location"
                    />
                </div>

                {/* Artists section */}
                <div>
                    <h2>My Artists</h2>
                    <div>
                        {artists.map((artist, index) => (
                            <span key={index}>{artist}</span>
                        ))}
                    </div>
                </div>

                {/* Save button */}
                <button onClick={handleUpdateProfile}>
                    Save Changes
                </button>
            </section>
        </div>
    )
}