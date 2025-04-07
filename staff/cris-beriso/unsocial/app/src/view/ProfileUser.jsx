import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

export default function ProfileUser(props) {
  console.log('Profile -> render')

  const handleSubmit = event => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      username: { value: username },
      password: { value: password },
    } = form

    try {
      logic.goProfileUser(name, username, password)

      form.reset()

      props.onProfile()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return <main className='Profile'>
    <h2>Profile</h2>

    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="name">New Name</Label>
        <Input type="text" id="name" />
      </Field>

      <Field>
        <Label htmlFor="username">New Username</Label>
        <Input type="text" id="username" />
      </Field>

      <Field>
        <Label htmlFor="password">New Password</Label>
        <PasswordInput id="password" />
      </Field>

      <Button type="submit">Save changes</Button>
    </Form>
  </main>
}