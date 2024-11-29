import DanceAppLogo from "../assets/DanceAppLogo.png"

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
  Anchor,
} from "./Components/library/index.js"

export default function Login(props) {
  console.log("Login -> render")

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

          props.onLoggedIn()
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

  const handleRegisterClick = (event) => {
    event.preventDefault()

    props.onRegisterClick()
  }

  return (
    <main className="flex justify-center items-center flex-col min-h-screen box-border">
      <div className="flex flex-col items-center mb-8">
        <img
          src={DanceAppLogo}
          alt="Logo de DanceApp"
          className="w-68 h-28 mb-4"
        />
        <h1 className="text-lg text-center text-white m-1.5 font-body">
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
      <Anchor href="/register" onClick={handleRegisterClick}>
        REGíSTRATE
      </Anchor>
    </main>
  )
}
