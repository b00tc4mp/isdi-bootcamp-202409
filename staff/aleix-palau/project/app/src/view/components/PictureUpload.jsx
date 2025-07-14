import { useState, useRef } from 'react'
import useContext from '../useContext'
import { X, Plus, Loader2 } from 'lucide-react'
import logic from '../../logic'
import { RoundedButton } from '../library'
import { toBase64 } from '../../util'

const MAX_FILE_SIZE = 4 * 1024 * 1024

export default function PictureUpload({ existingPictures = [], onPicturesUpdate, disabled = false }) {
    const { alert, confirm } = useContext()

    const [pictures, setPictures] = useState(existingPictures)
    const [isUploading, setIsUploading] = useState(false)
    const [deletingIndex, setDeletingIndex] = useState(null)
    const fileInputRef = useRef(null)

    const handleFileSelect = event => {
        // If component is disabled, don't process the file selection
        if (disabled) return

        const files = Array.from(event.target.files)

        // Clear the input value for consistent behavior
        const currentInput = event.target

        // Collect all validation errors
        const errors = []

        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                errors.push(`"${file.name}" is not an image file.`)
            } else if (file.size > MAX_FILE_SIZE) {
                errors.push(`"${file.name}" exceeds the 4 MB size limit.`)
            }
        })

        // Clear input value immediately after validation (to trigger the 'Max 3...' alert on subsequent attempts bc the pic count validation uses up-to-date data)
        if (currentInput) {
            currentInput.value = ''
        }

        // If any errors, show them all and stop
        if (errors.length > 0) {
            alert(errors.join('\n'), 'error')
            return
        }

        // Check total number of pictures
        if (pictures.length + files.length > 3) {
            alert(null, 'error', 'Maximum of 3 pictures allowed')
            return
        }

        setIsUploading(true)

        // Convert files to base64
        Promise.all(files.map(toBase64))
            .then(base64Pictures => {
                // Check for duplicates before uploading
                const duplicates = []
                const newPictures = []

                base64Pictures.forEach(base64Picture => {
                    if (pictures.includes(base64Picture)) {
                        duplicates.push(base64Picture)
                    } else {
                        newPictures.push(base64Picture)
                    }
                })

                // If all pictures are duplicates, show alert and stop
                if (duplicates.length === base64Pictures.length) {
                    setIsUploading(false)
                    alert('The selected picture is already in your profile.', 'warn', 'Duplicate Picture')
                    return
                }

                // If some pictures are duplicates but not all
                if (duplicates.length > 0 && newPictures.length > 0) {
                    alert(`${duplicates.length} ${duplicates.length === 1 ? 'picture is' : 'pictures are'} already in your profile and will be skipped.`, 'warn', 'Duplicate Picture')
                }

                // Only upload non-duplicate pictures
                if (newPictures.length > 0) {
                    return logic.uploadUserPictures(newPictures)
                        .then(result => {
                            setPictures(result.pictures)
                            onPicturesUpdate(result.pictures)
                        })
                }

                // If no new pictures to upload after filtering duplicates
                return Promise.resolve()
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsUploading(false)
            })
    }

    const handleDelete = (pictureToRemove, index) => {
        // If component is disabled, don't process the deletion
        if (disabled) return

        confirm(null, confirmed => {
            if (confirmed) {
                if (pictures.length <= 1) {
                    alert('If you\'d like to delete this photo, please add another one first.', 'error', 'You need at least one photo')
                    return
                }

                setDeletingIndex(index)
                try {
                    logic.deleteUserPicture(pictureToRemove)
                        .then(result => {
                            setPictures(result.pictures)
                            onPicturesUpdate(result.pictures)
                        })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                        .finally(() => {
                            setDeletingIndex(null)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }, 'warn', 'Delete photo?')
    }

    const handleAddClick = () => {
        if (!disabled) fileInputRef.current?.click()
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Existing Pictures */}
            {pictures.map((picture, index) => (
                <div key={index} className="relative w-full aspect-[4/3]">
                    <img
                        src={picture}
                        alt={`User picture ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute top-2 right-2">
                        <RoundedButton
                            icon={X}
                            onClick={() => handleDelete(picture, index)}
                            disabled={disabled}
                            isLoading={deletingIndex === index}
                            className="p-2 bg-lightest text-pink"
                        />
                    </div>
                    {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2.5 py-1.5 bg-black/50 text-lightest text-sm rounded-lg">
                            Profile picture
                        </div>
                    )}
                </div>
            ))}

            {/* Add Picture Button */}
            {pictures.length < 3 && (
                <button
                    onClick={handleAddClick}
                    className="w-full aspect-[4/3] border-2 border-dashed border-pink rounded-md flex flex-col items-center justify-center gap-3 active:opacity-70 disabled:opacity-70"
                    disabled={disabled || isUploading}
                >
                    {isUploading ? (
                        <Loader2 size={32} className="text-pink animate-spin" />
                    ) : (
                        <Plus size={32} className="text-pink" />
                    )}
                    <span className="text-pink">
                        {isUploading ? 'Uploading...' : 'Add photo'}
                    </span>
                </button>
            )}

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                multiple
                className="hidden"
                disabled={disabled}
            />
        </div>
    )
}