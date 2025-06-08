import { useState, useEffect } from 'react'
import { TagButton } from '../library'
import { Unlink } from 'lucide-react'
import { FaSpotify } from 'react-icons/fa'
import logic from '../../logic'
import useContext from '../useContext'

export default function SpotifyConnectionSection({
    isConnected,
    onConnectionChange,
    disabled = false
}) {
    const { alert, confirm } = useContext()
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    // Check URL params for Spotify callback
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('spotify') === 'connected') {
            // Re-check Spotify status after successful connection
            logic.getSpotifyStatus()
                .then(connected => {
                    if (onConnectionChange) onConnectionChange(connected)
                    if (connected) {
                        alert(null, 'success', 'Spotify connected successfully')
                    }
                })
                .catch(error => {
                    console.error('Error checking Spotify status:', error)
                })
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
        } else if (urlParams.get('error')) {
            alert('Please try again.', 'error', 'Failed to connect to Spotify')
            window.history.replaceState({}, document.title, window.location.pathname)
        }
    }, [alert, onConnectionChange])

    const handleConnect = () => {
        logic.connectSpotifyAccount()
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }

    const handleDisconnect = () => {
        confirm(
            'You won\'t be able to add new artists to your profile. You can reconnect anytime.',
            confirmed => {
                if (!confirmed) return

                setIsDisconnecting(true)
                logic.disconnectSpotifyAccount()
                    .then(() => {
                        if (onConnectionChange) onConnectionChange(false)
                        alert(null, 'success', 'Spotify disconnected')
                    })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
                    .finally(() => {
                        setIsDisconnecting(false)
                    })
            },
            'warn',
            'Disconnect Spotify?'
        )
    }

    return (
        <div className="flex gap-2">
            <TagButton
                icon={FaSpotify}
                onClick={handleConnect}
                disabled={isConnected || disabled}
                variant="green"
            >
                {isConnected ? 'Connected' : 'Connect'}
            </TagButton>

            <TagButton
                icon={Unlink}
                onClick={handleDisconnect}
                disabled={!isConnected || isDisconnecting || disabled}
                isLoading={isDisconnecting}
                variant="light"
            >
                {isConnected ? 'Disconnect' : 'Disconnected'}
            </TagButton>
        </div>
    )
}