import './Login.css'
import { Input, Form, Label, Field, PasswordInput, Button } from './library'

export default function Login() {
  console.log('Login -> render')

  return (
    <main>
      <p>Welcome to lovingHands</p>
      <h2>LOGIN</h2>
      <h4> Write username and password</h4>

      <Form>
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

      <a>Register</a>
    </main>
  )
}
