import { useState } from 'react'
import Logo from '../assets/logo.png'
import logic from '../logic'
import LocationInput from './components/functional/LocationInput'

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export default function CreateAd({ onCreated }) {
  const [images, setImages] = useState([])
  const [location, setLocation] = useState(null)

  const handleImageChange = (event) => {
    const { files } = event.target

    const images = Array.prototype.map.call(files, (file) => URL.createObjectURL(file))

    setImages(images)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const files = form.images.files
    const text = form.text.value
    // const coordinates = form.coordinates.value
    // const address = form.address.value

    const fileToB64Conversions = Array.prototype.map.call(files, toBase64)

    const locationFormatted = {
      coordinates: [location.lat, location.lon],
      address: location.address,
    }

    Promise.all(fileToB64Conversions)
      .then((filesB64) => {
        try {
          logic.createAd(filesB64, text, locationFormatted).then(() => {
            alert('Post created')
            form.reset()
            onCreated()
          })
        } catch (error) {
          alert(error.message)
          console.error
        }
      })
      .catch((error) => {
        alert(error.message)

        console.error(error)
      })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Form Section */}
      <div className="flex-grow flex flex-col items-center px-4">
        <form onSubmit={handleFormSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-6 space-y-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">Create New Ad</h1>

          {/* Image Upload */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
              multiple
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Text Description */}
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="text"
              name="text"
              placeholder="Write a short description..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
              rows="4"
              required
            />
          </div>
          {/* Location */}
          {/* <div>
            <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="coordinates"
              id="coordinates"
              placeholder="36.659979045469115, -4.754374953289659"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div> */}

          {/* <div>
            <label htmlFor="address"></label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Coín, Málaga"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div> */}

          <div>
            <LocationInput
              onLocationSelect={(location) => {
                console.log('Ubicacion seleccionada: ', location)
                setLocation(location)
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#68E1FD] text-black py-2 px-4 rounded-lg shadow-md hover:bg-[#E84D67] transition-all duration-200"
          >
            Create Ad
          </button>
        </form>

        {/* Image Preview */}
        <div className="w-full max-w-md mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <img key={image} src={image} alt="Preview" className="w-full h-32 object-cover rounded-md shadow" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
