import { errors } from 'com'

const { SystemError } = errors

import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import useContext from './useContext'

export default function Register(props) {
  console.log('Register -> render')

  const { alert } = useContext()

  const handleSubmit = event => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      email: { value: email },
      username: { value: username },
      password: { value: password },
      ['password-repeat']: { value: passwordRepeat }
    } = form

    try {
      logic.registerUser(name, email, username, password, passwordRepeat)
        .then(() => {
          form.reset()

          alert('User succesfully registered', 'success')

          props.onRegisterIn()
        })
        .catch(error => {
          if (error instanceof SystemError)
            alert('Sorry, try again later.')
          else
            alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleLoginClick = event => {
    event.preventDefault()

    props.onLoginClick()
  }

  return <main className="flex justify-center items-center flex-col h-fit w-72 py-4 box-border bg-[var(--color-box)] rounded-lg shadow-md shadow-[var(--shadow)]">
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

      <div className="password">
        <Field >
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" />
        </Field>

        <Field>
          <Label htmlFor="password-repeat">Repeat Password</Label>
          <PasswordInput id="password-repeat" />
        </Field>
      </div>
      <Button type="submit">Register</Button>

    </Form>

    <a href="" onClick={handleLoginClick}>Login</a>
  </main >
}
