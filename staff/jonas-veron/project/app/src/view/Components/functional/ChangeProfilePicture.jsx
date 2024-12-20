import { useState } from "react"
import useContext from "../../useContext"
import logic from "../../../logic"
import useLiterals from "../../useLiterals"
import { ButtonForm, Form } from "../library"

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
  const literals = useLiterals()

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    setPhotoPreview(URL.createObjectURL(file))
    setImage(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!image) {
      alert("Por favor, selecciona una imagen antes de guardar.", "warn")
      return
    }

    try {
      const image64 = await toBase64(image)
      await logic
        .changeProfilePicture(image64)
        .then(() => {
          alert("¡Tu foto de perfil se ha actualizado exitosamente!", "success")
          setPhotoPreview(null)
          setImage(null)
          event.target.reset()
        })
        .catch((error) => {
          console.error(error)
          alert(literals(error.message))
        })
    } catch (error) {
      alert(literals(error.message))

      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {photoPreview && (
        <div className="">
          <img
            src={photoPreview}
            alt="Vista previa"
            className="w-56 h-56 object-cover rounded-lg mx-auto"
          />
        </div>
      )}

      <label
        htmlFor="image"
        className="cursor-pointer flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 rounded-lg text-white bg-tertiary hover:bg-secondary transition duration-300 mb-2 mt-2"
      >
        Subir Imagen
      </label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={handleImageChange}
        className="hidden"
        required
      />

      <ButtonForm type="submit">Guardar Foto</ButtonForm>
    </Form>
  )
}
