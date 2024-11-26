import {
  PasswordInput,
  Input,
  Button,
  Form,
  Field,
  Label,
  Anchor,
} from "./Components/library/index.js"

export default function Login() {
  console.log("Login -> render")
  return (
    <main className="flex justify-center items-center flex-col h-full box-border pt-40">
      <h1>DanceApp!</h1>
      <h3 className="text-center mt-10 mb-10">
        Encuentra los mejores sociales y promociona tus clases o eventos
      </h3>
      <Form>
        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" />
        </Field>
        <Field>
          <Label>Contraseña</Label>
          <PasswordInput id="password" />
        </Field>

        <Button type="submit">Entra</Button>
      </Form>
      <p>¿ Aún no tienes cuenta ?</p>
      <Anchor>REGISTRATE AQUÍ</Anchor>
    </main>
  )
}
