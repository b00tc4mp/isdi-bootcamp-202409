import DanceAppLogo from "../assets/DanceAppLogo.png"
import { useNavigate, Link } from "react-router-dom"

import logic from "../logic"

import { errors } from "com"

const { SystemError } = errors

import {
  PasswordInput,
  Input,
  ButtonForm,
  Form,
  Field,
  Label,
} from "./Components/library/index.js"

export default function Login() {
  console.log("Login -> render")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      email: { value: email },
      password: { value: password },
    } = form

    try {
      logic
        .loginUser(email, password)
        .then(() => {
          form.reset()
          navigate("/")
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
    <main className="flex flex-grow justify-center items-center flex-col min-h-screen box-border pt-[10vh] pb-[14vh]">
      <div className="flex flex-col items-center mb-8">
        <img
          src={DanceAppLogo}
          alt="Logo de DanceApp"
          className="w-[44vh] h-[16vh] mb-[0.5vh]"
        />
        <h1 className="text-base text-center text-white m-1.5 font-body">
          Descubre sociales, clases y promociona tus eventos con DanceApp!
        </h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email" className="text-white"></Label>
          <Input type="email" id="email" placeholder="E-mail" />
        </Field>
        <Field>
          <Label></Label>
          <PasswordInput id="password" placeholder="Contraseña" />
        </Field>

        <ButtonForm type="submit">INICIAR SESIÓN</ButtonForm>
      </Form>
      <p className="text-white p-4">¿ Aún no tienes cuenta ?</p>
      <Link to="/register">
        <p className="no-underline hover:underline hover:text-accentgreen text-white cursor-pointer pt-4 text-sm">
          REGíSTRATE
        </p>
      </Link>
    </main>
  )
}
