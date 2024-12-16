import logic from "../../../logic"
import useContext from "../../useContext"
import { errors } from "com"

const { SystemError } = errors

export default function ChangeEmail() {
  const { alert } = useContext()
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
          alert(error.message)
        })
    } catch (error) {
      if (error instanceof SystemError) alert("Por favor, inténtelo más tarde")
      else alert(error.message)
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="email"
          id="old-email"
          placeholder="E-mail actual"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="new-email"
          placeholder="Nuevo E-mail"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="new-email-repeat"
          placeholder="Confirme su nuevo E-mail"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-accentpink hover:bg-tertiary text-white py-3 px-4 rounded w-full"
      >
        Actualizar E-mail
      </button>
    </form>
  )
}
