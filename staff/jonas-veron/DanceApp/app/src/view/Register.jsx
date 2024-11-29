import DanceAppLogo from "../assets/DanceAppLogo.png"
import logic from "../logic"
import { errors } from "com/"

import {
  PasswordInput,
  Input,
  ButtonForm,
  Form,
  Field,
  Label,
  Anchor,
} from "../view/Components/library/index.js"

const { SystemError } = errors

export default function Register(props) {
  console.log("Register -> render")

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      fullName: { value: fullName },
      email: { value: email },
      password: { value: password },
      passwordRepeat: { value: passwordRepeat },
    } = form

    try {
      logic
        .registerUser(fullName, email, password, passwordRepeat)
        .then(() => {
          form.reset()

          alert("Usuario registrado")

          props.onRegistered()
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

  const handleLoginClick = (event) => {
    event.preventDefault()

    props.onLoginClick()
  }

  return (
    <main className="flex justify-center items-center flex-col min-h-screen box-border">
      <div className="flex flex-col items-center">
        <img
          src={DanceAppLogo}
          alt="Logo de DanceApp"
          className="w-68 h-28 mb-4"
        />
        <h1 className="text-lg text-center text-white m-1.5 font-body">
          Regístrate para descubrir sociales, clases y promocionar tus eventos
          con DanceApp!
        </h1>
      </div>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="fullName"></Label>
          <Input type="text" id="fullName" placeholder="Nombre y Apellidos" />
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

        <ButtonForm type="submit">REGISTRO</ButtonForm>
      </Form>
      <p className="text-white p-1">¿ Tienes una cuenta ?</p>

      <Anchor href="" onClick={handleLoginClick}>
        INICIAR SESIÓN
      </Anchor>
    </main>
  )
}
