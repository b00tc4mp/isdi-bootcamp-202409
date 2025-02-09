import { useState, useEffect } from 'react'
import { errors } from 'com'
import useContext from '../useContext'
import logic from '../../logic'

const { SystemError } = errors

const MAX_FILE_SIZE = 4 * 1024 * 1024

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
})

export default function PictureUpload() {
    const [pictures, setPictures] = useState([])
    const [previews, setPreviews] = useState([])
    const [loading, setLoading] = useState(false)
    const { alert } = useContext()

    useEffect(() => {
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview))
        }
    }, [previews])

    const handlePictureChange = event => {
        const files = Array.from(event.target.files).filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert('File too large (max 4 MB)', 'warn')
                return false
            }
            return true
        })

        if (files.length > 3) {
            alert('You can only upload up to 3 pictures.', 'warn')
            return
        }

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews.slice(0, 3 - prev.length)])

        const fileToBase64Promises = files.map(toBase64)

        try {
            Promise.all(fileToBase64Promises)
                .then(base64Images => {
                    setPictures(prev => [...prev, ...base64Images.slice(0, 3 - prev.length)])
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleUpload = () => {
        setLoading(true)

        if (pictures.length === 0) {
            alert('Please select at least one picture.', 'warn')
            return
        }

        try {
            logic.uploadUserPictures(pictures)
                .then(() => {
                    alert('Pictures uploaded successfully!', 'success')
                    setPictures([])
                    setPreviews([])
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
                .finally(() => setLoading(false))
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleRemovePicture = (index) => {
        setPictures(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div>
            <h2>Upload Pictures</h2>
            <input type="file" onChange={handlePictureChange} multiple accept="image/*" />
            <button onClick={handleUpload} disabled={pictures.length === 0 || loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            <div>
                <h3>Preview</h3>
                {previews.map((picture, index) => (
                    <div key={picture}>
                        <img src={picture} width="100" />
                        <button onClick={() => handleRemovePicture(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

// TODO: rewmove picture
// reset preview quan surt alerta de file uploaded