import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logic from "../logic"
import { Form, Field, ButtonForm } from "./../view/Components/library/index.js"
import LocationInput from "./Components/functional/LocationInput.jsx"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export default function CreateEvent() {
  console.log("CreateEvent -> render")
  const [images, setImages] = useState([])
  const [location, setLocation] = useState(null)
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const { files } = event.target
    const images = Array.prototype.map.call(files, (file) =>
      URL.createObjectURL(file)
    )
    setImages(images)
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const form = event.target

    const files = form.image.files
    const eventType = form.eventType.value
    const text = form.text.value
    const eventDate = form.eventDate.value
    const filetoB64Conversions = Array.prototype.map.call(files, toBase64)

    const locationFormatted = {
      coordinates: [location.lat, location.lon],
      address: location.address,
      province: location.province,
    }

    const parsedDate = new Date(`${eventDate}:00Z`)

    Promise.all(filetoB64Conversions).then((filesb64) => {
      try {
        logic.createEvent(
          filesb64,
          eventType,
          text,
          parsedDate,
          locationFormatted
        )
        form.reset()
        navigate("/")
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
    })
  }

  return (
    <main className="pt-28 pb-12 flex justify-center items-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Crear Evento
        </h1>
        <div className="mb-6">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Vista previa"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
          ))}
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Field>
            <input
              type="file"
              name="image"
              id="image"
              placeholder="http://example.com/image.jpg"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              onChange={handleImageChange}
            />
          </Field>

          <Field>
            <select name="eventType" id="eventType" required>
              <option value="" disabled>
                --Selecciona el tipo de evento--
              </option>
              <option value="Sociales">Social</option>
              <option value="Escuelas de baile">Escuelas de baile</option>
              <option value="Clases particulares">Clases particulares</option>
              <option value="Congresos">Congresos</option>
              <option value="Masterclases">Masterclases</option>
            </select>
          </Field>

          <Field>
            <textarea
              name="text"
              id="text"
              maxLength="200"
              placeholder="Descripción del evento"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            ></textarea>
          </Field>

          <Field>
            <input
              type="datetime-local"
              name="eventDate"
              id="eventDate"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </Field>

          <Field>
            <LocationInput
              onLocationSelect={(location) => {
                console.log("Ubicación seleccionada:", location)
                setLocation(location)
              }}
            />
          </Field>
          {location && (
            <p className="text-green-500 mt-2">
              Dirección seleccionada: {location.address}
            </p>
          )}

          <ButtonForm type="submit">Crear Evento</ButtonForm>
        </Form>
      </div>
    </main>
  )
}