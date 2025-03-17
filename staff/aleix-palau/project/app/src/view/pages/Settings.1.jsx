import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { GenderModal } from '../components'
import { SingleSlider, DualSlider } from '../library'
import { ChevronRight } from 'lucide-react'

const { SystemError } = errors

export default function Settings() {
    const { alert, confirm } = useContext()

    // User settings state
    const [targetGender, setTargetGender] = useState([])
    const [distance, setDistance] = useState('')
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')

    // Spotify connection state
    // const [spotifyConnected, setSpotifyConnected] = useState(false)
    // const [spotifyUsername, setSpotifyUsername] = useState('')

    // UI state
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [showGenderModal, setShowGenderModal] = useState(false)

    // Load user settings
    useEffect(() => {
        logic.getUserProfile()
            .then(profile => {
                // Set settings from profile
                setTargetGender(profile.targetGender)
                setDistance(profile.distance || 50)
                setMinAge(profile.minAge || 18)
                setMaxAge(profile.maxAge || 55)
                // setSpotifyConnected(!!profile.spotifyId) // converts into a boolean explicitly (avoids null/undefined if falsy)
                // setSpotifyUsername(profile.spotifyId ? 'Your Spotify Account' : '')
                setIsLoading(false)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }, [])

    // Save settings handler
    const handleSaveSettings = () => {
        // Prevent duplicate submissions
        if (isSaving) return

        const updatedSettings = { targetGender, distance, minAge, maxAge }
        setIsSaving(true)

        try {
            logic.updateUserProfile(updatedSettings)
                .then(() => {
                    alert(null, 'success', 'Dating preferences saved')
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
                .finally(() => {
                    setIsSaving(false)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        if (targetGender.length === 0) { // que puguis desseleccionarho tot pro et salti lalerta quan guardis
            alert(null, 'error', 'You must select at least one gender preference')
            setIsSaving(false)
            return
        }
    }

    // Handle Spotify connection
    // const handleSpotifyConnection = async () => {
    //     if (spotifyConnected) {
    //         // Disconnect flow
    //         confirm(null, async (confirmed) => {
    //             if (confirmed) {
    //                 try {
    //                     await disconnectSpotify()
    //                     setSpotifyConnected(false)
    //                     setSpotifyUsername('')
    //                     alert(null, 'success', 'Spotify disconnected')
    //                 } catch (error) {
    //                     console.error(error)
    //                     alert(error.message || 'Failed to disconnect Spotify')
    //                 }
    //             }
    //         }, 'warn', 'Disconnect Spotify?')
    //     } else {
    //         // Connect flow
    //         try {
    //             await connectToSpotify()
    //         } catch (error) {
    //             console.error(error)
    //             alert(error.message || 'Failed to connect to Spotify')
    //         }
    //     }
    // }

    // Connect to Spotify method
    // const connectToSpotify = async () => {
    //     try {
    //         // In a real implementation, this would trigger the OAuth flow
    //         // For now, we'll simulate it with a setTimeout
    //         alert('Redirecting to Spotify for authentication...', 'info')

    //         // Mock implementation - In production, this would redirect to Spotify
    //         setTimeout(() => {
    //             setSpotifyConnected(true)
    //             setSpotifyUsername('Your Spotify Account')
    //             alert(null, 'success', 'Connected to Spotify')
    //         }, 1500)
    //     } catch (error) {
    //         console.error(error)
    //         throw error
    //     }
    // }

    // Disconnect from Spotify method
    // const disconnectSpotify = async () => {
    //     try {
    //         // In a real implementation, this would call an API
    //         // For now, we'll simulate it with a setTimeout
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, 1000)
    //         })
    //     } catch (error) {
    //         console.error(error)
    //         throw error
    //     }
    // }

    const getGenderDisplay = () => {
        if (targetGender.length === 3) return 'Everyone'
        if (targetGender.length === 1) return targetGender[0]
        if (targetGender.length === 2) {
            if (targetGender.includes('Men') && targetGender.includes('Women')) {
                return 'Men & Women'
            }
            if (targetGender.includes('Men') && targetGender.includes('Nonbinary people')) {
                return 'Men & Nonbinary people'
            }
            return 'Women & Nonbinary people'
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto p-4 space-y-4 bg-gray-50 min-h-full">
            {/* Gender Selection */}
            <div className="bg-white rounded-xl shadow-sm">
                <button
                    className="p-4 w-full flex justify-between items-center"
                    onClick={() => setShowGenderModal(true)}
                >
                    <span className="text-gray-800 font-semibold">Show Me</span>
                    <div className="flex items-center -mr-1">
                        <span className="text-gray-600 mr-1">{getGenderDisplay()}</span>
                        <ChevronRight size={20} className="text-gray-400" />
                    </div>
                </button>
            </div>

            {/* Maximum Distance */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-800 font-semibold">Maximum Distance</h3>
                        <span className="text-gray-600">{distance} km</span>
                    </div>

                    <SingleSlider
                        value={distance}
                        min={1}
                        max={100}
                        onChange={setDistance}
                    />
                </div>
            </div>

            {/* Age Range */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-800 font-semibold">Age Range</h3>
                        <span className="text-gray-600">
                            {minAge}-{maxAge}{maxAge >= 55 ? '+' : ''}
                        </span>
                    </div>

                    <DualSlider
                        minValue={minAge}
                        maxValue={maxAge}
                        min={18}
                        max={55}
                        onMinChange={setMinAge}
                        onMaxChange={setMaxAge}
                    />
                </div>
            </div>

            {/* Spotify Connection */}
            {/* <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-800 font-semibold">
                            {spotifyConnected ? 'Connected to Spotify' : 'Connect to Spotify'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {spotifyConnected
                                ? spotifyUsername
                                : 'Share your music taste'}
                        </p>
                    </div>

                    <button
                        onClick={handleSpotifyConnection}
                        className={`px-4 py-2 rounded-lg ${spotifyConnected
                            ? 'bg-red-500 text-white active:bg-red-600'
                            : 'bg-green-500 text-white active:bg-green-600'
                            }`}
                    >
                        {spotifyConnected ? 'Disconnect' : 'Connect'}
                    </button>
                </div>
            </div> */}

            {/* Save Button */}
            <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="w-full py-3 bg-purple-600 text-white rounded-lg active:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>

            {/* Gender Selection Modal */}
            {showGenderModal && (
                <GenderModal
                    selectedGenders={targetGender}
                    onGendersChange={setTargetGender}
                    onClose={() => setShowGenderModal(false)}
                />
            )}
        </div>
    )
}
// TODO: change email/password?, age range, maximum distance (boolean true? (Global)), target gender (show me/Interested in), disconnect from spotify?
// TODO: afegir efecte griset quan cliques i desabilitar quan cliquem a save changes