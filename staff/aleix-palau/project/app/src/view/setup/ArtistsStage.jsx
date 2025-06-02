import { useState, useEffect } from 'react'
import { PrimaryButton, ArtistTag, RoundedButton } from '../library'
import { SpotifyConnectionSection, ArtistSearchBox } from '../components'
import { orderArtists } from '../../util'
import { Loader2, X, Music } from 'lucide-react'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'

const { SystemError } = errors

export default function ArtistsStage(props) {
    const { alert } = useContext()

    const [selectedArtists, setSelectedArtists] = useState([])
    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false)
    const [isCheckingSpotify, setIsCheckingSpotify] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Check Spotify connection status on mount
    useEffect(() => {
        logic.getSpotifyStatus()
            .then(isConnected => {
                setIsSpotifyConnected(isConnected)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsCheckingSpotify(false)
            })
    }, [])

    const handleAddArtist = artist => {
        setSelectedArtists([...selectedArtists, artist])
    }

    const handleRemoveArtist = artistId => {
        setSelectedArtists(selectedArtists.filter(a => a.id !== artistId))
    }

    const handleSkip = () => {
        // Update stage to completed when skipping, and ensure artists array is set (even if empty)
        logic.updateUserProfile({ artists: [] })
            .then(() => logic.updateUserStage('completed'))
            .then(() => { props.onSetupComplete() })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }

    const handleSubmit = () => {
        if (selectedArtists.length === 0) {
            alert(null, 'warn', 'Please select at least one artist')
            return
        }

        setIsSubmitting(true)
        logic.updateUserProfile({ artists: selectedArtists })
            .then(() => logic.updateUserStage('completed'))
            .then(() => { props.onSetupComplete() })
            .catch(error => {
                if (error instanceof SystemError)
                    alert('Sorry, try again later.')
                else
                    alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    if (isCheckingSpotify) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-pink" />
            </div>
        )
    }

    return (
        <main className="max-w-2xl mx-auto px-8 py-4">
            <h2 className="text-2xl font-bold text-darkest-blue mb-6">Your Music Taste</h2>

            {!isSpotifyConnected ? (
                <div className="text-center">
                    <Music size={48} className="text-pink mx-auto mb-4" />
                    <p className="text-dark-blue mb-5 px-3">
                        Connect your Spotify account to easily add your favourite artists.
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        <SpotifyConnectionSection
                            isConnected={isSpotifyConnected}
                            onConnectionChange={setIsSpotifyConnected}
                        />
                        <PrimaryButton
                            onClick={handleSkip}
                            className="bg-pink max-w-xs"
                        >
                            Skip for now
                        </PrimaryButton>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Search Section */}
                    <ArtistSearchBox
                        selectedArtists={selectedArtists}
                        onAddArtist={handleAddArtist}
                        disabled={isSubmitting}
                        className="mb-4"
                    />

                    {/* Selected Artists */}
                    <p className="text-darkest-blue font-semibold text-lg">
                        Your favourite artists ({selectedArtists.length}/10)
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {selectedArtists.length === 0 ? (
                            <p className="text-dark-blue text-sm mt-2">No artists added yet.</p>
                        ) : (
                            orderArtists(selectedArtists).map(artist => (
                                <div key={artist.id} className="relative">
                                    <ArtistTag>
                                        {artist.name}
                                    </ArtistTag>
                                    <RoundedButton
                                        icon={X}
                                        iconSize={14}
                                        onClick={() => handleRemoveArtist(artist.id)}
                                        className="absolute -top-2 -right-2 w-5 h-5 bg-darkest-blue/70 text-lightest"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex-column text-center mt-8">
                        <PrimaryButton
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-pink max-w-xs"
                        >
                            {isSubmitting ? 'Saving...' : 'Next'}
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={handleSkip}
                            disabled={isSubmitting}
                            className="bg-light max-w-xs mt-3"
                        >
                            Skip for now
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </main>
    )
}