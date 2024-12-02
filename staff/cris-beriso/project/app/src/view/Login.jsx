import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

import useContext from './useContext'

export default function Login(props) {
  const { alert } = useContext()

  const handleSubmit = event => {
    event.preventDefault()

    const { target: { username: { value: username }, password: { value: password } } } = event

    try {
      logic.loginUser(username, password)
        .then(() => {
          event.target.reset()

          props.onLoggedIn()
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

  const handleRegisterClick = event => {
    event.preventDefault()

    props.onRegisterClick()
  }

  return <main>
    <h2>MakeUp Scanner!</h2>

    <h3>Login</h3>

    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" />
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" />
      </Field>

      <Button type="submit">Login</Button>
    </Form>

    <a href="" onClick={handleRegisterClick}>Register</a>
  </main>
}