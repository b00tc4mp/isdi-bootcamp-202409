import DanceAppLogo from "../assets/DanceAppLogo.svg"
import logic from "../logic"
import { useNavigate, Link } from "react-router-dom"
import { errors } from "com/"
import useContext from "./useContext"

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
  console.log("Register -> render")
  const { alert } = useContext()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      email: { value: email },
      role: { value: role },
      password: { value: password },
      passwordRepeat: { value: passwordRepeat },
    } = form

    try {
      logic
        .registerUser(name, email, role, password, passwordRepeat)
        .then(() => {
          form.reset()

          alert("Usuario registrado", "success")

          navigate("/login")
        })
        .catch((error) => {
          if (error instanceof SystemError)
            alert("Por favor, inténtelo más tarde")
          else alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  return (
    <main className="flex flex-grow justify-center items-center flex-col min-h-screen box-border pt-16 pb-16">
      <div className="flex flex-col items-center">
        <img
          src={DanceAppLogo}
          alt="Logo de DanceApp"
          className="w-[38vh] h-28 mb-4"
        />
        <h1 className="text-lg text-center text-white m-1.5 font-body">
          Regístrate para descubrir sociales, clases y promocionar tus eventos
          con DanceApp!
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
          <Label htmlFor="role"></Label>
          <select id="role">
            <option value="dancer">Bailarín</option>
            <option value="organizer">Organizador</option>
          </select>
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

        <ButtonForm type="submit">REGISTRO</ButtonForm>
      </Form>
      <p className="text-white p-1">¿ Tienes una cuenta ?</p>

      <Link to="/login">
        <p className="no-underline hover:underline hover:text-accentgreen text-white cursor-pointer pt-4 text-sm">
          INICIAR SESIÓN
        </p>
      </Link>
    </main>
  )
}
