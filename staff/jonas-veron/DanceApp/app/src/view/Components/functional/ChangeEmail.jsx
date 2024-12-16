export default function ChangeEmail() {
  return (
    <form>
      <div className="mb-4">
        <input
          type="email"
          placeholder="E-mail actual"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Nuevo E-mail"
          required
          className="focus:outline-none p-2 rounded-lg bg-tertiary text-white w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
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
