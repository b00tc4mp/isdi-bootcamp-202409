import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { UserDetail, NoMoreProfiles } from '../components'
import { IconButton, ArtistTag } from '../library'
import { MapPin, Heart, X, ChevronDown } from 'lucide-react'
import { calculateAge, orderArtists } from '../../util'

const { SystemError } = errors

export default function People({ onSettingsClick }) {
    const { alert } = useContext()

    const [potentialMatches, setPotentialMatches] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isLeftSwiping, setIsLeftSwiping] = useState(false)
    const [isRightSwiping, setIsRightSwiping] = useState(false)
    const [showUserDetail, setShowUserDetail] = useState(false)

    // Fetch both current user and potential matches on component mount
    useEffect(() => {
        setIsLoading(true)

        // Get current user profile (for coordinates)
        logic.getUserProfile()
            .then(profile => {
                setCurrentUser(profile)
                // Then fetch potential matches
                return logic.getPotentialMatches()
            })
            .then(matches => {
                setPotentialMatches(matches)
                setCurrentMatchIndex(0)
                setIsLoading(false)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
                setIsLoading(false)
            })
    }, [])

    const handleSwipe = action => {
        // Don't process swipes when already processing one
        if (action === 'left' && isLeftSwiping) return
        if (action === 'right' && isRightSwiping) return

        const currentMatch = potentialMatches[currentMatchIndex]
        if (!currentMatch) return

        // Set the appropriate loading state
        if (action === 'left')
            setIsLeftSwiping(true)
        else
            setIsRightSwiping(true)

        try {
            logic.createHeartbeat(currentMatch._id, action)
                .then(result => {
                    // If a match was created
                    if (result.match)
                        alert(`You matched with ${currentMatch.name}!`, 'success', 'New Match!')

                    // Move to next profile
                    if (currentMatchIndex < potentialMatches.length - 1)
                        setCurrentMatchIndex(prev => prev + 1)
                    else
                        // No more profiles
                        setPotentialMatches([])
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
                .finally(() => {
                    // Reset the appropriate loading state
                    if (action === 'left')
                        setIsLeftSwiping(false)
                    else
                        setIsRightSwiping(false)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
            // Reset the appropriate loading state
            if (action === 'left')
                setIsLeftSwiping(false)
            else
                setIsRightSwiping(false)
        }
    }

    const handleViewUserDetail = () => {
        setShowUserDetail(true)
    }

    const handleBackFromUserDetail = () => {
        setShowUserDetail(false)
    }

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        )
    }

    // Render empty state when no more profiles
    if (potentialMatches.length === 0 || currentMatchIndex >= potentialMatches.length)
        return <NoMoreProfiles onSettingsClick={onSettingsClick} />

    const currentMatch = potentialMatches[currentMatchIndex]

    // Detailed view - pass both user and currentUser props
    if (showUserDetail) {
        return <UserDetail user={currentMatch} currentUser={currentUser} onBack={handleBackFromUserDetail} />
    }

    return (
        <div className="max-w-lg mx-auto h-full p-3 bg-lightest flex flex-col">
            <div className="flex-grow relative overflow-hidden rounded-xl shadow-lg mb-5">
                {/* Profile Image */}
                <div className="w-full h-full">
                    <img
                        src={currentMatch.profilePicture || currentMatch.pictures[0]}
                        alt={`${currentMatch.name}'s profile`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 from-15% to-transparent p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-lightest mb-2">{currentMatch.name}, {calculateAge(currentMatch.dateOfBirth)}</h2>
                            {currentMatch.location && (
                                <span className="flex items-center gap-0.5 mb-0.5 text-light">
                                    <MapPin size={18} />
                                    <p className="text-lightest">{currentMatch.location}</p>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Common Artists Tags */}
                    {currentMatch.commonArtists && currentMatch.commonArtists.length > 0 && (
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {orderArtists(currentMatch.commonArtists).map((artist, index) => (
                                    <ArtistTag key={index} className="opacity-70">
                                        {artist}
                                    </ArtistTag>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center mb-4 gap-8">
                <IconButton
                    icon={X}
                    onClick={() => handleSwipe('left')}
                    disabled={isLeftSwiping || isRightSwiping}
                    isLoading={isLeftSwiping}
                    iconSize={32}
                    className={"p-4 bg-darkest-blue text-light"}
                />
                <IconButton
                    icon={ChevronDown}
                    onClick={handleViewUserDetail}
                    iconSize={32}
                    className="p-2.5 bg-light-blue text-light"
                />
                <IconButton
                    icon={Heart}
                    onClick={() => handleSwipe('right')}
                    disabled={isLeftSwiping || isRightSwiping}
                    isLoading={isRightSwiping}
                    iconSize={32}
                    className="p-4 bg-pink text-light"
                />
            </div>
        </div>
    )
}