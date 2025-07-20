import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logic from "../logic"
import { Form, Field, ButtonForm } from "./../view/Components/library/index.js"
import LocationInput from "./Components/functional/LocationInput.jsx"
import useContext from "./useContext"
import useLiterals from "./useLiterals"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export default function CreateEvent() {
  const [images, setImages] = useState([])
  const [location, setLocation] = useState(null)
  const navigate = useNavigate()

  const { alert } = useContext()
  const literals = useLiterals()

  const handleImageChange = (event) => {
    const { files } = event.target
    const imagePreviews = Array.prototype.map.call(files, (file) =>
      URL.createObjectURL(file)
    )
    setImages(imagePreviews)
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const form = event.target

    const images = form.images.files
    const type = form.type.value
    const text = form.text.value
    const date = form.date.value
    const filetoB64Conversions = Array.prototype.map.call(images, toBase64)

    const locationFormatted = {
      coordinates: [location.lat, location.lon],
      address: location.address,
      province: location.province,
    }

    const parsedDate = new Date(date)

    Promise.all(filetoB64Conversions).then((images) => {
      try {
        logic
          .createEvent(images, type, text, parsedDate, locationFormatted)
          .then(() => {
            form.reset()
            navigate("/")
          })
          .catch((error) => {
            alert(literals(error.message))

            console.error(error)
          })
      } catch (error) {
        alert(literals(error.message))

        console.error(error)
      }
    })
  }

  return (
    <main className="pt-24 pb-12 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg p-4">
        <h1 className="text-2xl font-semibold text-white text-center mb-6 font-body">
          Crear Evento
        </h1>
        <div>
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Vista previa"
              className="w-full rounded-lg mb-2 shadow-md"
            />
          ))}
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Field>
            <label
              htmlFor="images"
              className="bg-accentpink text-white font-bold border-4 text-center border-transparent hover:bg-accentgreen transition duration-300 rounded-lg w-full h-12 pt-2"
            >
              Cargar Imagen
            </label>
            <input
              type="file"
              name="images"
              id="images"
              required
              className="hidden"
              onChange={handleImageChange}
            />
          </Field>

          <Field>
            <select
              name="type"
              id="type"
              required
              className="w-full p-2 bg-tertiary text-white rounded-lg mt-4 h-12"
            >
              <option value="" disabled selected>
                --Selecciona el tipo de evento--
              </option>
              <option value="Sociales">Social</option>
              <option value="Escuelas de baile">Escuela de baile</option>
              <option value="Clases particulares">Clase particular</option>
              <option value="Congresos">Congreso</option>
              <option value="Masterclases">Masterclass</option>
            </select>
          </Field>

          <Field>
            <textarea
              name="text"
              id="text"
              maxLength="200"
              placeholder="Descripción del evento..."
              required
              className="focus:outline-none p-2 rounded-lg bg-tertiary mt-4 text-white h-24 w-full"
            ></textarea>
          </Field>

          <Field>
            <label
              htmlFor="date"
              className="relative top-2 text-gray-400 text-base duration-300 px-1"
            >
              Selecciona la fecha del evento:
            </label>
            <input
              type="date"
              id="date"
              className=" w-full border-2 rounded-lg bg-transparent text-white"
            />
          </Field>

          <Field>
            <LocationInput
              onLocationSelect={(location) => {
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
