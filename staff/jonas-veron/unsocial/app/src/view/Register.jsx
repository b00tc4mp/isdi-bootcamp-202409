import "./Register.css"

import { errors } from "com"

const { SystemError } = errors

import {
  PasswordInput,
  Input,
  Button,
  Form,
  Field,
  Label,
} from "../components/library"

import useContext from "./useContext.js"

import logic from "../logic"

export default function register(props) {
  console.log("Register -> render")

  const { alert } = useContext()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      email: { value: email },
      username: { value: username },
      password: { value: password },
      ["password-repeat"]: { value: passwordRepeat },
    } = form

    try {
      logic
        .registerUser(name, email, username, password, passwordRepeat)
        .then(() => {
          form.reset()

          props.onRegistered()
        })

        .catch((error) => {
          if (error instanceof SystemError) alert("Sorry, try again later.")
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
    <main className="Register">
      <h2>Register</h2>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" />
        </Field>

        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" />
        </Field>

        <Field>
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" />
        </Field>

        <Field>
          <Label htmlFor="password-repeat">Repeat Password</Label>
          <PasswordInput id="password-repeat" />
        </Field>

        <Button type="submit" className="Button">
          Register
        </Button>
      </Form>

      <a href="" onClick={handleLoginClick}>
        Login
      </a>
    </main>
  )
}
