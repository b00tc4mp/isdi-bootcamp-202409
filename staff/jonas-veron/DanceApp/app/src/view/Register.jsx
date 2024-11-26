import {
  PasswordInput,
  Input,
  Button,
  Form,
  Field,
  Label,
  Anchor,
} from "../view/Components/library/index.js"

export default function Register() {
  console.log("Register -> render")

  return (
    <main>
      <h2>Registro</h2>

      <Form>
        <Field>
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" id="name" />
        </Field>

        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input type="text" id="email" />
        </Field>

        <Field>
          <Label htmlFor="password">Contraseña</Label>
          <PasswordInput type="password" id="password" />
        </Field>

        <Field>
          <Label htmlFor="passwordRepeat">Confirmar contraseña</Label>
          <PasswordInput type="password" id="passwordRepeat" />
        </Field>

        <Button type="submit">Registro</Button>
      </Form>

      <Anchor>Atras</Anchor>
    </main>
  )
}
