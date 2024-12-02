import { useNavigate } from "react-router-dom"
import logic from "../logic"
import { Form, Field, ButtonForm } from "./../view/Components/library/index.js"

export default function CreateEvent() {
  console.log("CreateEvent -> render")
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      image: { value: image },
      text: { value: text },
      date: { value: date },
      coordinates: { value: coordinates },
      address: { value: address },
    } = form

    const location = {
      coordinates: coordinates.split(",").map(Number),
      address,
    }

    const parsedDate = new Date(`${date}:00Z`)

    try {
      await logic.createEvent(image, text, parsedDate, location)
      form.reset()
      navigate("/")
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return (
    <main className="pt-28 flex justify-center items-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Crear Evento
        </h1>
        <Form onSubmit={handleSubmit}>
          <Field>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="http://example.com/image.jpg"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
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
              name="date"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </Field>

          <Field>
            <input
              type="text"
              name="coordinates"
              id="coordinates"
              placeholder="41.3870154, 2.1700471"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </Field>

          <Field>
            <input
              type="text"
              name="address"
              placeholder="Girona, España"
              required
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </Field>

          <ButtonForm type="submit">Crear Evento</ButtonForm>
        </Form>
      </div>
    </main>
  )
}
