export default function register() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 m-5">
        <h1 className="text-2xl font-bold text-center mb-6">
          ¡Bienvenido a ekoality!
        </h1>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nombre*</span>
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Apellido(s)*</span>
            </label>
            <input
              type="text"
              placeholder="Apellido(s)"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Correo electrónico*
              </span>
            </label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Contraseña*</span>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Confirmar contraseña*
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Localidad*</span>
            </label>
            <select className="select select-bordered w-full" required>
              <option value="" disabled selected>
                Seleccione su localidad
              </option>
              <option value="Castellar del Valles">Castellar del Valles</option>
              <option value="Sabadell">Sabadell</option>
            </select>
          </div>
          <div className="form-control">
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                required
              />
              <span className="label-text ml-2">
                Acepto los términos y condiciones.
              </span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}
