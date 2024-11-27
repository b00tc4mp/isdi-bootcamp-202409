import DanceAppLogo from "../assets/DanceAppLogo.png"

import {
  PasswordInput,
  Input,
  ButtonForm,
  Form,
  Field,
  Label,
  Anchor,
} from "./Components/library/index.js"

export default function Login() {
  console.log("Login -> render")
  return (
    <main className="flex justify-center items-center flex-col min-h-screen box-border bg-gradient-to-b from-secondary to-primary">
      <div className="flex flex-col items-center mb-8">
        <img
          src={DanceAppLogo}
          alt="Logo de DanceApp"
          className="w-68 h-28 mb-4"
        />
        <h1 className="text-lg text-center text-white m-1.5 font-body">
          Encuentra los mejores sociales y promociona tus clases o eventos
        </h1>
      </div>
      <Form>
        <Field>
          <Label htmlFor="email" className="text-white"></Label>
          <Input type="email" id="email" placeholder="E-mail" />
        </Field>
        <Field>
          <Label></Label>
          <PasswordInput id="password" placeholder="Contraseña" />
        </Field>

        <ButtonForm type="submit">Entra</ButtonForm>
      </Form>
      <p className="text-white p-4">¿ Aún no tienes cuenta ?</p>
      <Anchor>REGISTRATE AQUÍ</Anchor>
    </main>
  )
}
