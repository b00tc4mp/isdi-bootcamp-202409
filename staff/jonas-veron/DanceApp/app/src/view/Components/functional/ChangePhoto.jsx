import { useState } from "react"
import { Field, Form } from "../library"

export default function ChangePhoto() {
  const [photoPreview, setPhotoPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica para enviar la nueva foto
    alert("Foto actualizada")
  }

  return (
    <Form onSubmit={handleSubmit}>
      {photoPreview && (
        <div className="mb-4">
          <img
            src={photoPreview}
            alt="Vista previa"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </div>
      )}
      <Field>
        <label
          htmlFor="images"
          className="bg-tertiary text-white rounded-lg w-full h-10 pt-1 mt-20"
        >
          Subir Imagen
        </label>
        <input
          type="file"
          name="images"
          id="images"
          onChange={handleImageChange}
          className="hidden"
        />
      </Field>

      <button
        type="submit"
        className="bg-accentpink hover:bg-tertiary text-white py-3 px-4 rounded-2xl w-full"
      >
        Guardar Foto
      </button>
    </Form>
  )
}
