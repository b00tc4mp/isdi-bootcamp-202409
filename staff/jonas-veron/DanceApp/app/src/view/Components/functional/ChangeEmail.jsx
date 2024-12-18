import logic from "../../../logic"
import useContext from "../../useContext"
import { errors } from "com"
import useLiterals from "../../useLiterals"
import { Input, ButtonForm } from "../library"

const { SystemError } = errors

export default function ChangeEmail() {
  const { alert } = useContext()
  const literals = useLiterals()
  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      ["old-email"]: { value: oldEmail },
      ["new-email"]: { value: newEmail },
      ["new-email-repeat"]: { value: newEmailRepeat },
    } = form

    try {
      logic
        .changeEmail(oldEmail, newEmail, newEmailRepeat)
        .then(() => {
          form.reset()
          alert("¡Tu e-mail se ha actualizado exitosamente!", "success")
        })
        .catch((error) => {
          console.error(error)
          alert(literals(error.message))
        })
    } catch (error) {
      if (error instanceof SystemError) alert("Por favor, inténtelo más tarde")
      else alert(literals(error.message))
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input
          type="email"
          id="old-email"
          placeholder="E-mail actual"
          required
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          id="new-email"
          placeholder="Nuevo E-mail"
          required
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          id="new-email-repeat"
          placeholder="Confirme su nuevo E-mail"
          required
        />
      </div>
      <ButtonForm type="submit">Actualizar E-mail</ButtonForm>
    </form>
  )
}
