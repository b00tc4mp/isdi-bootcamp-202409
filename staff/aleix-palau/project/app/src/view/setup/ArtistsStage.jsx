import { useState, useEffect } from 'react'
import { PrimaryButton, ArtistTag, RoundedButton } from '../library'
import { ArtistSearchBox } from '../components'
import { orderArtists } from '../../util'
import { Loader2, X } from 'lucide-react'
import logic from '../../logic'
import useContext from '../useContext'

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

    const handleConnectSpotify = () => {
        logic.connectSpotifyAccount()
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }

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
        <main className="flex items-center justify-center min-h-full p-10">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-darkest-blue mb-2">
                        Your Music Taste
                    </h2>

                    {!isSpotifyConnected ? (
                        <>
                            <p className="text-dark-blue mb-5">
                                Connect your Spotify account to easily add your favourite artists.
                            </p>
                            <PrimaryButton
                                onClick={handleConnectSpotify}
                                className="bg-green max-w-xs mt-3"
                            >
                                Connect to Spotify
                            </PrimaryButton>

                            <PrimaryButton
                                onClick={handleSkip}
                                className="bg-pink max-w-xs mt-3"
                            >
                                Skip for now
                            </PrimaryButton>
                        </>
                    ) : (
                        <div className="space-y-4">
                            {/* Search Section */}
                            <ArtistSearchBox
                                selectedArtists={selectedArtists}
                                onAddArtist={handleAddArtist}
                                disabled={isSubmitting}
                                className="mt-5 mb-4"
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
                                    Next
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
                </div>
            </div>
        </main>
    )
}