import { useState, useEffect } from 'react'
import useContext from '../useContext'
import logic from '../../logic'
import { PrimaryButton, ArtistTag, RoundedButton, TagButton } from '../library'
import { useAutoResizeTextarea } from '../../hooks'
import { PictureUpload, Spinner, ArtistSearchBox } from '../components'
import { calculateAge, orderArtists } from '../../util'
import { Plus, X } from 'lucide-react'

export default function Profile() {
    const { alert, confirm } = useContext()

    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [artists, setArtists] = useState([])
    const [pictures, setPictures] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)

    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false)
    const [showArtistSearch, setShowArtistSearch] = useState(false)

    const { textareaRef } = useAutoResizeTextarea(bio, 72)

    useEffect(() => {
        Promise.all([
            logic.getUserProfile(),
            logic.getSpotifyStatus()
        ])
            .then(([profile, spotifyStatus]) => {
                setName(profile.name)
                setDateOfBirth(profile.dateOfBirth)
                setBio(profile.bio || '')
                setLocation(profile.location || '')
                setArtists(profile.artists || [])
                setPictures(profile.pictures || [])
                setIsSpotifyConnected(spotifyStatus)
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

        const updates = { bio, location, artists }
        setIsUpdating(true)

        try {
            logic.updateUserProfile(updates)
                .then(() => {
                    alert(null, 'success', 'Your details were saved')
                })
                .catch(error => {
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

    const handleAddArtist = artist => {
        setArtists([...artists, artist])
    }

    const handleRemoveArtist = artistId => {
        confirm(null, confirmed => {
            if (confirmed) setArtists(artists.filter(a => a.id !== artistId))
        },
            'warn', 'Remove this artist?')
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
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-darkest-blue">My Artists ({artists.length}/10)</h2>
                        {isSpotifyConnected && (
                            <TagButton
                                onClick={() => setShowArtistSearch(!showArtistSearch)}
                                disabled={isUpdating}
                                variant="blue"
                            >
                                <div className="flex items-center gap-1">
                                    <span
                                        className="transition-transform duration-300"
                                        style={{ transform: showArtistSearch ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                        {showArtistSearch ? <X size={16} /> : <Plus size={16} />}
                                    </span>
                                    Add Artist
                                </div>
                            </TagButton>
                        )}
                    </div>
                    {!isSpotifyConnected && (
                        <p className="text-sm text-darkest-blue">
                            Connect Spotify in Settings to add artists.
                        </p>
                    )}

                    {/* Artist Search (shown when button clicked) */}
                    {showArtistSearch && (
                        <ArtistSearchBox
                            selectedArtists={artists}
                            onAddArtist={handleAddArtist}
                            disabled={isUpdating}
                            className="mb-4"
                        />
                    )}

                    {/* Current Artists */}
                    <div className="flex flex-wrap gap-3">
                        {artists.length === 0 ? (
                            <p className="text-dark-blue text-sm">No artists added yet.</p>
                        ) : (
                            orderArtists(artists).map(artist => (
                                <div key={artist.id} className="relative">
                                    <ArtistTag>
                                        {artist.name}
                                    </ArtistTag>
                                    <RoundedButton
                                        icon={X}
                                        iconSize={14}
                                        onClick={() => handleRemoveArtist(artist.id)}
                                        className="absolute -top-2 -right-2 w-5 h-5 bg-darkest-blue/70 text-lightest"
                                        disabled={isUpdating}
                                    />
                                </div>
                            ))
                        )}
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