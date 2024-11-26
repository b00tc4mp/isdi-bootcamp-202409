import { Button, Field, Form, Input, Label, PasswordInput } from './library'

export default function Register(props) {
  console.log('Register -> render')

  return (
    <main>
      <h2>REGISTER</h2>

      <Form>
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
          <Label htmlFor="passwordRepeat">Repeat Password</Label>
          <PasswordInput id="passwordRepeat" />
        </Field>

        <Button type="submit">Register</Button>
      </Form>

      <p>
        Already have an account? <a href="">Login</a>
      </p>
    </main>
  )
}
