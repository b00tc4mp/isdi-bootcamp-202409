import DanceTappLogo from "../assets/DanceTappLogo.svg"
import { useNavigate, Link } from "react-router-dom"
import useContext from "./useContext"
import useLiterals from "./useLiterals"
import logic from "../logic"
import { errors } from "com"

import {
  PasswordInput,
  Input,
  ButtonForm,
  Form,
  Field,
  Label,
} from "./Components/library/index.js"

const { SystemError } = errors

export default function Login() {
  const { alert } = useContext()
  const navigate = useNavigate()
  const literals = useLiterals()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      email: { value: email },
      password: { value: password },
    } = form

    try {
      logic
        .loginUser(email, password)
        .then(() => {
          form.reset()
          navigate("/")
        })
        .catch((error) => {
          if (error instanceof SystemError)
            alert("Por favor, inténtelo más tarde")
          else alert(literals(error.message))
          console.error(error)
        })
    } catch (error) {
      alert(literals(error.message))

      console.error(error)
    }
  }

  return (
    <main className="flex flex-grow justify-center items-center flex-col min-h-screen box-border pt-[10vh] pb-[14vh]">
      <div className="flex flex-col items-center mb-4">
        <img
          src={DanceTappLogo}
          alt="Logo de DanceTap"
          className="w-[44vh] h-[16vh] mb-[0.5vh]"
        />
        <h1 className="text-base text-center text-white font-body mb-2 p-2">
          Descubre sociales, clases y promociona tus eventos con DanceTapp!
        </h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email" className="text-white"></Label>
          <Input type="email" id="email" placeholder="E-mail" />
        </Field>
        <Field>
          <Label></Label>
          <PasswordInput id="password" placeholder="Contraseña" />
        </Field>

        <ButtonForm type="submit">INICIAR SESIÓN</ButtonForm>
      </Form>
      <p className="text-white p-1 mt-3">¿ Aún no tienes cuenta ?</p>
      <Link to="/register">
        <p className="no-underline hover:underline hover:text-accentgreen text-white cursor-pointer pt-2 text-base font-bold  ">
          REGíSTRATE
        </p>
      </Link>
    </main>
  )
}
