export default function ChangePassword() {
  return (
    <form>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Contraseña actual"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
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
