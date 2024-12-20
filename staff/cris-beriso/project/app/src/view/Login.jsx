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
          console.log(error.message)
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

  return <main className="bg-back  text-customblack pt-10 flex justify-start items-center flex-col h-screen box-border gap-16">
    <h2 className="text-4xl pt-10 ">MakeUp Scanner!</h2>

    <div className="bg-box w-[12.5rem] h-[15rem] flex justify-center items-center flex-col box-border rounded-lg shadow-lg gap-2">
      <h3 className="text-2xl">Login</h3>
      <Form onSubmit={handleSubmit} >
        <Field>
          <Label htmlFor="username"></Label>
          <Input type="text" id="username" placeholder="Username" className="text-[var(--back-color)]" />
        </Field>

        <Field>
          <Label htmlFor="password"></Label>
          <PasswordInput id="password" placeholder="Password" />
        </Field>

        <Button type="submit">Login</Button>
      </Form>

      <a href="" onClick={handleRegisterClick}>Go to Register</a>
    </div>
  </main>
}