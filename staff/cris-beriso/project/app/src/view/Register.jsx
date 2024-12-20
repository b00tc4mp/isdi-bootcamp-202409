import { errors } from 'com'

const { SystemError } = errors

import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import useContext from './useContext'

export default function Register(props) {
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

          alert('User successfully registered', 'success')

          props.onRegistered()
        })
        .catch(error => {
          if (error instanceof SystemError)
            alert('Sorry, try again later')
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

  return <main className="bg-back text-customblack  pt-10 flex justify-start items-center flex-col h-screen box-border ">
    <h2 className="text-4xl p-10  ">MakeUp Scanner</h2>

    <div className="bg-box w-[12.5rem] h-[22rem] flex justify-center items-center flex-col box-border rounded-lg shadow-lg">

      <h3 className="text-2xl pb-1">Register</h3>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name"></Label>
          <Input type="text" id="name" placeholder="Name" />
        </Field>

        <Field>
          <Label htmlFor="email"></Label>
          <Input type="email" id="email" placeholder="E-mail" />
        </Field>

        <Field>
          <Label htmlFor="username"></Label>
          <Input type="text" id="username" placeholder="Username" />
        </Field>

        <Field>
          <Label htmlFor="password"></Label>
          <PasswordInput id="password" placeholder="Password" />
        </Field>

        <Field>
          <Label htmlFor="password-repeat"></Label>
          <PasswordInput id="password-repeat" placeholder="Repeat Password" />
        </Field>

        <Button type="submit" >Register</Button>
      </Form>

      <a href="" onClick={handleLoginClick}>Go to Login</a>

    </div>
  </main>

}