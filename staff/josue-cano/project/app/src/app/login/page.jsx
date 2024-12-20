"use client";
import { useState } from "react";
import { login } from "../logic/auth";
import { redirect } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");

  function authenticate(event) {
    event.preventDefault();

    const fields = event.target;

    login({ username: fields.email.value, password: fields.password.value })
      .catch((err) => {
        // alert(err);
      })
      .then(() => redirect("/"));
  }

  return (
    <section
      className="flex items-center justify-center min-h-screen bg-cover bg-center" >
      {/* video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/campos2s.mp4"
        autoPlay
        muted
        loop></video>

      <div className="bg-white absolute rounded-lg shadow-2xl w-full max-w-md p-8">
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-6">¡Bienvenido de nuevo!</h1>

        <form onSubmit={authenticate} className="space-y-4" noValidate>
          {/* Campo Correo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Correo electrónico</span>
            </label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="input input-bordered w-full"
              id="email"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              id="password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Botón Iniciar Sesión */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          {/* Mensaje de Registro */}
          <p className="text-center text-gray-600 mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
