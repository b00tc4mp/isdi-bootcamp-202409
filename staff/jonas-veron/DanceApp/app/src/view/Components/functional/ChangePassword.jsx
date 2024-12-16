import logic from "../../../logic"
import useContext from "../../useContext"
import { errors } from "com"

const { SystemError } = errors

export default function ChangePassword() {
  const { alert } = useContext()
  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      ["old-password"]: { value: oldPassword },
      ["new-password"]: { value: newPassword },
      ["new-password-repeat"]: { value: newPasswordRepeat },
    } = form

    try {
      logic
        .changePassword(oldPassword, newPassword, newPasswordRepeat)
        .then(() => {
          form.reset()

          alert("¡Tu contraseña se ha actualizado exitosamente!", "success")
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
          type="password"
          id="old-password"
          placeholder="Contraseña actual"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="new-password"
          placeholder="Nueva contraseña"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="new-password-repeat"
          placeholder="Confirmar contraseña"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-accentpink hover:bg-tertiary text-white py-3 px-4 rounded w-full"
      >
        Actualizar Contraseña
      </button>
    </form>
  )
}
