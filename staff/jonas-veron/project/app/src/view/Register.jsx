import { DanceTappLogo } from "../assets/index.js"
import logic from "../logic"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { errors } from "com/"
import useContext from "./useContext"
import useLiterals from "./useLiterals.js"
import {
  PasswordInput,
  Input,
  ButtonForm,
  Form,
  Field,
  Label,
} from "../view/Components/library/index.js"

const { SystemError } = errors

export default function Register() {
  const [role, setRole] = useState("")

  const { alert } = useContext()
  const literals = useLiterals()
  const navigate = useNavigate()

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
      passwordRepeat: { value: passwordRepeat },
    } = form

    try {
      logic
        .registerUser(name, email, role, password, passwordRepeat)
        .then(() => {
          form.reset()

          alert("¡Usuario registrado con éxito!", "success")

          navigate("/login")
        })
        .catch((error) => {
          if (error instanceof SystemError)
            alert("Por favor, inténtelo más tarde")
          else alert(literals(error.message))
          console.error(error)
        })
    } catch (error) {
      alert(literals(error.message))
      console.error(error)
    }
  }

  return (
    <main className="flex flex-grow justify-center items-center flex-col min-h-screen box-border pt-2 pb-8">
      <div className="flex flex-col items-center">
        <img
          src={DanceTappLogo}
          alt="Logo de DanceTap"
          className="w-[38vh] h-28 mb-2"
        />
        <h1 className="text-base text-center text-white font-body mb-2">
          Regístrate para descubrir sociales, clases y promocionar tus eventos
          con DanceTapp!
        </h1>
      </div>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name"></Label>
          <Input type="text" id="name" placeholder="Nombre y Apellidos" />
        </Field>

        <Field>
          <Label htmlFor="email"></Label>
          <Input type="text" id="email" placeholder="E-mail" />
        </Field>

        <Field>
          <Label htmlFor="password"></Label>
          <PasswordInput type="password" id="password" />
        </Field>

        <Field>
          <Label htmlFor="passwordRepeat"></Label>
          <PasswordInput
            type="password"
            id="passwordRepeat"
            placeholder="Confirmar contraseña"
          />
        </Field>

        <Field>
          <div className="mt-3">
            <label className="block text-white font-bold font-body mb-2">
              Selecciona tu rol
            </label>
            <div className="flex gap-4 justify-center mt-2">
              {/* Botón Bailarín */}
              <button
                type="button"
                onClick={() => handleRoleSelect("dancer")}
                className="bg-tertiary w-full min-w-32 rounded text-white font-body border-2 border-accentpink hover:bg-accentgreen focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-100 py-2 px-2"
              >
                Bailarín
              </button>

              {/* Botón Organizador */}
              <button
                type="button"
                onClick={() => handleRoleSelect("organizer")}
                className="bg-tertiary w-full min-w-32 rounded text-white font-body border-2 border-accentpink hover:bg-accentgreen focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-100 py-2 px-2"
              >
                Organizador
              </button>
            </div>
          </div>
        </Field>

        <ButtonForm type="submit">REGISTRO</ButtonForm>
      </Form>
      <p className="text-white p-1 mt-3">¿ Tienes una cuenta ?</p>

      <Link to="/login">
        <p className="no-underline hover:underline hover:text-accentgreen text-white cursor-pointer pt-2 text-base font-bold">
          INICIAR SESIÓN
        </p>
      </Link>
    </main>
  )
}
