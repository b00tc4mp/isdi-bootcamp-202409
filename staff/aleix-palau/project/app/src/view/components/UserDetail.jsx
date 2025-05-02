import { useState } from 'react'
import { ChevronUp, House, MapPin } from 'lucide-react'
import { calculateAge, formatDistance, orderArtists } from '../../util'
import { RoundedButton, ArtistTag } from '../library'

export default function UserDetail({ user, currentUser, onBack }) {
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)

    if (!user) return null

    const handleNextPicture = () => {
        if (currentPictureIndex < user.pictures.length - 1) {
            setCurrentPictureIndex(prev => prev + 1) // updater function
        } else {
            setCurrentPictureIndex(0)
        }
    }

    // Check if we can display distance
    const canShowDistance =
        currentUser?.coordinates?.coordinates &&
        user?.coordinates?.coordinates

    return (
        <div className="max-w-2xl mx-auto p-3 bg-lightest h-full overflow-y-auto">

            {/* Pictures */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md mb-4">
                <img
                    src={user.pictures[currentPictureIndex] || '/images/default-profile.jpeg'}
                    className="w-full h-full object-cover"
                    onClick={handleNextPicture}
                />

                {/* Picture counter */}
                {user.pictures.length > 1 && (
                    <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2.25 py-1.25 bg-black/50 text-lightest text-sm rounded-full">
                        <div className="flex gap-1.5">
                            {user.pictures.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${currentPictureIndex === index ? 'bg-pink' : 'bg-lightest/80'}`}
                                />
                            ))}
                        </div>
                    </span>
                )}
            </div>

            <div className="text-3xl font-bold text-dark-blue mb-2">
                {user.name}, {calculateAge(user.dateOfBirth)}
            </div>

            <div className="mb-4">
                {/* Location Section */}
                {user.location && (
                    <span className="flex items-center gap-1">
                        <House size={20} className="text-dark-blue" />
                        <p className="text-dark-blue">Lives in {user.location}</p>
                    </span>
                )}

                {/* Distance Section */}
                {canShowDistance && (
                    <span className="flex items-center gap-1">
                        <MapPin size={20} className="text-dark-blue" />
                        <p className="text-dark-blue">{formatDistance(currentUser.coordinates, user.coordinates)}</p>
                    </span>
                )}
            </div>

            {/* About Section */}
            {user.bio && (
                <>
                    <h2 className="text-lg font-semibold text-dark-blue mb-1">About me</h2>
                    <p className="text-dark-blue mb-4">{user.bio}</p>
                </>
            )}

            {/* Artists Section */}
            {user.artists && user.artists.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold text-dark-blue mb-2.5">Artists</h2>
                    <div className="flex flex-wrap gap-1.5">
                        {orderArtists(user.artists).map((artist, index) => {
                            const isCommonArtist = user.commonArtists && user.commonArtists.includes(artist)

                            return (
                                <ArtistTag key={index} isHighlighted={isCommonArtist}>
                                    {artist}
                                </ArtistTag>
                            )
                        })}
                    </div>
                </>
            )}

            {/* Back Button */}
            <div className="flex items-center justify-center p-4">
                <RoundedButton
                    icon={ChevronUp}
                    onClick={onBack}
                    iconSize={32}
                    className="p-2.5 bg-light-blue text-light"
                />
            </div>
        </div>
    )
}