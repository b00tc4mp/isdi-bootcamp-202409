import './Register.css'
import logic from "../logic/"
import { PasswordInput, Input, Button, Label, Form } from "../components/biblio"

function Register(props) {
  return (
    <main className="Register">
      <h2>Register to unSocial</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()

          const { target: form } = event
          const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            confirmPassword: { value: confirmPassword } } = form

          try {
            logic.registerUser(name, email, username, password, confirmPassword)
            form.reset()
            props.onRegistered()
          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Enter your name" required />
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" required />
        <Label htmlFor="username">User Name</Label>
        <Input type="text" id="username" placeholder="Enter your username" required />
        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput id="confirmPassword" />
        <Button id="btn-register" type="submit">Register</Button>
      </Form>
      <p>Already have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorLogin()
      }
      }>Login</a></p>
    </main>
  )
}

export default Register