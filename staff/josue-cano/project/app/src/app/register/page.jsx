"use client";
import { redirect } from "next/navigation";
import { registerUser } from "../logic/users/registerUser";
import { getLocations } from "../logic/users/getLocations";
import { useEffect, useState } from "react";

export default function Register() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then((locations) => setLocations(locations));
  }, []);

  function handleRegister(event) {
    event.preventDefault();
    const fields = event.target;

    const firstName = fields.firstName.value;
    const lastName = fields.lastName.value;
    const email = fields.email.value;
    const ubicacion = fields.city.value;
    const password = fields.password.value;
    const passwordRepeat = fields.passwordRepeat.value;

    registerUser({
      firstName,
      lastName,
      email,
      ubicacion,
      password,
      passwordRepeat,
    }).then(() => {
      redirect("/login");
    });
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 pt-[5rem]">
      {/* Agregué pt-[5rem] para ajustar el margen superior según la altura del header */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 m-5">
        <h1 className="text-2xl font-bold text-center mb-6">¡Bienvenido a ekoality!</h1>
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nombre*</span>
            </label>
            <input type="text" name="firstName" placeholder="Nombre" className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Apellido(s)*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido(s)"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Correo electrónico*</span>
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirmar contraseña*</span>
            </label>
            <input
              type="password"
              name="passwordRepeat"
              placeholder="Confirmar contraseña"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Localidad*</span>
            </label>
            <select name="city" className="select select-bordered w-full" defaultValue={""} required>
              <option value="" disabled>
                Seleccione su localidad
              </option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.ciudad}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="cursor-pointer flex items-center">
              <input type="checkbox" className="checkbox checkbox-primary" required />
              <span className="label-text ml-2">Acepto los términos y condiciones.</span>
            </label>
          </div>
          <button type="submit" className="btn btn-secondary w-full mt-4">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}
