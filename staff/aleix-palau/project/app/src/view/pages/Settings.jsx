import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { GenderModal, SettingsSection, Spinner } from '../components'
import { SingleSlider, DualSlider, PrimaryButton } from '../library'
import { ChevronRight, MapPin, RefreshCw, Loader2 } from 'lucide-react'
import { formatLocation } from '../../util'

const { SystemError } = errors

export default function Settings() {
    const { alert, confirm } = useContext() // TODO: confirm per lo dspoti Settings.1.jsx

    const [targetGender, setTargetGender] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [distance, setDistance] = useState(100)
    const [minAge, setMinAge] = useState(18)
    const [maxAge, setMaxAge] = useState(55)

    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(false)
    const [showGenderModal, setShowGenderModal] = useState(false)

    // Load user settings
    useEffect(() => {
        logic.getUserProfile()
            .then(profile => {
                // Set settings from profile
                setTargetGender(profile.targetGender || [])
                setCoordinates(profile.coordinates || {})
                setDistance(profile.distance || 100)
                setMinAge(profile.minAge || 18)
                setMaxAge(profile.maxAge || 55)
                setIsLoading(false)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }, [])

    // Getting user location handler
    const handleUpdateLocation = () => {
        // Prevent duplicate submissions
        if (isUpdatingLocation || isSaving) return

        setIsUpdatingLocation(true)

        if (!navigator.geolocation) {
            setIsUpdatingLocation(false)
            alert('Try using a different browser.', 'error', 'Your browser doesn\'t support geolocation')
            return
        }

        navigator.geolocation.getCurrentPosition(
            // success parameter
            position => {
                try {
                    const newCoordinates = {
                        type: 'Point',
                        coordinates: [position.coords.longitude, position.coords.latitude]
                    }
                    setCoordinates(newCoordinates)
                    setIsUpdatingLocation(false)
                    alert(null, 'success', 'Location updated successfully')
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                    setIsUpdatingLocation(false)
                }
            },
            // error parameter
            error => {
                setIsUpdatingLocation(false)

                let errorMessage = "Couldn't get your location."
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "You need to allow location access in your browser settings"
                        break
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable"
                        break
                    case error.TIMEOUT:
                        errorMessage = "The request to get your location timed out"
                        break
                }
                alert(null, 'error', errorMessage)
            },
            // options parameter
            {
                maximumAge: 0,
                timeout: 10000,
                enableHighAccuracy: true
            }
        )
    }

    // Save settings handler
    const handleSaveSettings = () => {
        // Prevent duplicate submissions
        if (isSaving) return

        if (targetGender.length === 0) {
            alert(null, 'error', 'You must select at least one gender preference')
            return
        }

        if (!coordinates || !coordinates.coordinates || coordinates.coordinates.length !== 2) {
            alert(null, 'error', 'Please update your location before saving')
            return
        }

        const updatedSettings = { targetGender, coordinates, distance, minAge, maxAge }
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
            setIsSaving(false)
        }
    }

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
    if (isLoading) return <Spinner />

    return (
        <div className="max-w-lg mx-auto px-4 py-3 space-y-4 bg-lightest min-h-full">

            {/* Gender Selection */}
            <div onClick={() => !isSaving && setShowGenderModal(true)} className={isSaving ? 'opacity-70' : ''}>
                <SettingsSection
                    title="Show Me"
                    value={
                        <div className="flex items-center -mr-1">
                            <span>{getGenderDisplay()}</span>
                            <ChevronRight size={22} className="text-pink" />
                        </div>
                    }
                />
            </div>

            {/* Location Section */}
            <SettingsSection
                title="My Location"
                value={
                    <div className="flex items-center">
                        <MapPin className="text-dark-blue mr-1" size={18} />
                        <span>{formatLocation(coordinates)}</span>
                    </div>
                }
            >
                <div className="flex items-center mt-3 gap-3">
                    <div className="text-xs text-dark-blue">
                        Your location is used to find matches within your selected distance and is never shared.
                    </div>
                    <button
                        className={`flex items-center justify-center px-2.5 py-1.5 text-sm bg-light text-darkest-blue rounded-lg active:scale-[.98] min-w-[85.27px] ${(isUpdatingLocation || isSaving) ? 'opacity-70' : ''}`}
                        onClick={handleUpdateLocation}
                        disabled={isUpdatingLocation || isSaving}
                    >
                        {isUpdatingLocation ? (
                            <>
                                <Loader2 size={18} className="min-h-5 animate-spin" />
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} className="mr-1" />
                                <span>Update</span>
                            </>
                        )}
                    </button>
                </div>
            </SettingsSection>

            {/* Maximum Distance */}
            <SettingsSection
                title="Maximum Distance"
                value={`Up to ${distance} km away`}
            >
                <SingleSlider
                    value={distance}
                    min={1}
                    max={200}
                    onChange={setDistance}
                    disabled={isSaving}
                />
            </SettingsSection>

            {/* Age Range */}
            <SettingsSection
                title="Age Range"
                value={`Between ${minAge} and ${maxAge}${maxAge >= 55 ? '+' : ''}`}
            >
                <DualSlider
                    minValue={minAge}
                    maxValue={maxAge}
                    min={18}
                    max={55}
                    onMinChange={setMinAge}
                    onMaxChange={setMaxAge}
                    disabled={isSaving}
                />
            </SettingsSection>

            {/* Save Button */}
            <PrimaryButton
                onClick={handleSaveSettings}
                disabled={isSaving}
                className={isSaving ? 'opacity-70' : ''}
            >Save Changes
            </PrimaryButton>

            {/* Gender Selection Modal */}
            {
                showGenderModal && (
                    <GenderModal
                        selectedGenders={targetGender}
                        onGendersChange={setTargetGender}
                        onClose={() => setShowGenderModal(false)}
                    />
                )
            }
        </div>
    )
}
// TODO: change email/password?, disconnect from spotify?