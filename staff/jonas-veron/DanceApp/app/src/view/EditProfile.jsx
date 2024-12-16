import logic from "../logic"
import { useState, useEffect } from "react"
import {
  Form,
  ButtonForm,
  Field,
  Input,
} from "../view/Components/library/index.js"

export default function EditProfile() {
  // const [name, setName] = useState(null)
  // console.log(name)

  // useEffect(() => {
  //   try {
  //     logic
  //       .getUserName()
  //       .then((name) => setName(name))
  //       .catch((error) => {
  //         alert(error.message)
  //         console.error(error)
  //       })
  //   } catch (error) {
  //     alert(error.message)
  //     console.error(error)
  //   }
  // }, [name])
  return (
    <main className="pt-10 pb-12 flex justify-center items-center">
      <div className="w-full max-w-lg p-12">
        {/* <img
          // src={photoPreview}
          alt="Vista previa de la foto"
          className="w-full rounded-lg mb-2"
        /> */}
        {/* <div className="w-20 h-20 rounded-full bg-accentpink flex items-center justify-center text-white text-xl font-bold mb-4">
          {name[0].toUpperCase()}
        </div> */}
        <h1 className="pt-16 text-white text-2xl font-semibold text-center mb-6 font-body">
          Mi Perfil
        </h1>

        <Form>
          <Field>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              required
              className="focus:outline-none p-2 rounded-lg bg-tertiary mt-2 text-white"
            />
          </Field>
          <Field>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              className="focus:outline-none p-2 rounded-lg bg-tertiary mt-2 text-white"
            />
          </Field>
          <Field>
            <input
              type="password"
              name="password"
              placeholder="Nueva contraseña (opcional)"
              className="focus:outline-none p-2 rounded-lg bg-tertiary mt-2 text-white"
            />
          </Field>
          <Field>
            <label
              htmlFor="photo"
              className="bg-accentpink text-white font-bold border-2 border-transparent hover:bg-accentgreen hover:border-accentpink focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-300 rounded-lg w-full h-10 pt-1 mt-2"
            >
              Subir Foto
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="hidden"
              // onChange={handleImageChange}
            />
          </Field>

          <ButtonForm type="submit">Guardar Cambios</ButtonForm>
        </Form>
      </div>
    </main>
  )
}
