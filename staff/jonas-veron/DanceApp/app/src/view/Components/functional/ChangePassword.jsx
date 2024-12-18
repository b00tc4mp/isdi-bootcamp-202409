import logic from "../../../logic"
import useContext from "../../useContext"
import useLiterals from "../../useLiterals"
import { PasswordInput, ButtonForm } from "../library"

export default function ChangePassword() {
  const { alert } = useContext()
  const literals = useLiterals()
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
      alert(literals(error.message))
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <PasswordInput
          type="password"
          id="old-password"
          placeholder="Contraseña actual"
          required
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          type="password"
          id="new-password"
          placeholder="Nueva contraseña"
          required
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          type="password"
          id="new-password-repeat"
          placeholder="Confirmar contraseña"
          required
        />
      </div>
      <ButtonForm type="submit">Actualizar Contraseña</ButtonForm>
    </form>
  )
}
