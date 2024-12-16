import { useState } from "react"
// import { Field, Form } from "../library"
import { errors } from "com"
import useContext from "../../useContext"

const { SystemError } = errors

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export default function ChangeProfilePicture() {
  const [photoPreview, setPhotoPreview] = useState(null)
  const [image, setImage] = useState(null)

  const { alert } = useContext()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      toBase64(file).then((base64) => setImage(base64))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!image) {
      alert("Por favor, selecciona una imagen antes de guardar.", "warn")
      return
    }

    try {
      logic
        .ChangeProfilePicture(image)
        .then(() => {
          alert("¡Tu foto de perfil se ha actualizado exitosamente!", "success")
          setPhotoPreview(null)
          setImage(null)
          event.target.reset()
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      if (error instanceof SystemError) alert("Por favor, inténtelo más tarde")
      else alert(error.message)
      console.error(error)
    }

    alert("Foto actualizada", "success")
  }

  return (
    <form onSubmit={handleSubmit}>
      {photoPreview && (
        <div className="mb-4">
          <img
            src={photoPreview}
            alt="Vista previa"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </div>
      )}

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
        required
      />

      <button
        type="submit"
        className="bg-accentpink hover:bg-tertiary text-white py-3 px-4 rounded-2xl w-full"
      >
        Guardar Foto
      </button>
    </form>
  )
}
