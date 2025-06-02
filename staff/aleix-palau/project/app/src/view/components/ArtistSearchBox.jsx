import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import logic from '../../logic'
import useContext from '../useContext'

export default function ArtistSearchBox({
    selectedArtists = [],
    onAddArtist,
    disabled = false,
    maxArtists = 10,
    className = ''
}) {
    const { alert } = useContext()

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = () => {
        if (!searchQuery.trim() || isSearching) return

        setIsSearching(true)
        logic.searchSpotifyArtists(searchQuery)
            .then(artists => {
                setSearchResults(artists)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsSearching(false)
            })
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
        }
    }

    const handleAddArtist = artist => {
        // Check if artist already selected
        if (selectedArtists.some(a => a.id === artist.id)) {
            alert('Artist already added', 'warn')
            return
        }

        // Check max limit
        if (selectedArtists.length >= maxArtists) {
            alert(`You can select up to ${maxArtists} artists`, 'warn')
            return
        }

        if (onAddArtist) {
            onAddArtist({ id: artist.id, name: artist.name })
        }
    }

    return (
        <div className={`p-3 bg-skin rounded-lg ${className}`}>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search artist..."
                    className="flex-1 px-3 py-2 border border-lightest rounded-lg outline-none focus:border-pink"
                    disabled={isSearching || disabled}
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim() || disabled}
                    className="px-3 py-2 bg-pink text-light rounded-lg disabled:opacity-50 transition-transform active:scale-[.98]"
                >
                    {isSearching ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Search size={20} />
                    )}
                </button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {searchResults.map(artist => {
                        const isAdded = selectedArtists.some(a => a.id === artist.id)

                        return (
                            <div
                                key={artist.id}
                                className="flex items-center justify-between p-1.5 bg-light rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    {artist.image && (
                                        <img
                                            src={artist.image}
                                            alt={artist.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                    )}
                                    <span className="text-dark-blue text-sm">{artist.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleAddArtist(artist)}
                                    className={`px-2 py-1 ${isAdded ? 'bg-pink/50' : 'bg-pink'} text-lightest rounded-full text-xs transition-transform active:scale-[.98]`}
                                    disabled={isAdded || disabled}
                                >
                                    {isAdded ? 'Added' : 'Add'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}