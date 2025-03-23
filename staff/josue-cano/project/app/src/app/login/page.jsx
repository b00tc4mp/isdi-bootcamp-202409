"use client";

import { useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useRouter } from "next/navigation";
import { login } from "../logic/auth";
import Alert from "../ui/Alert";

export default function Login() {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertLevel, setAlertLevel] = useState("success");

  async function authenticate(event) {
    event.preventDefault();
    const fields = event.target;

    try {
      await login({ email: fields.email.value, password: fields.password.value });
      // Si se llega aquí, fue exitoso. Mostramos alert de éxito.
      setAlertLevel("success");
      setAlertMessage("¡Has iniciado sesión correctamente!");
    } catch (error) {
      if (isRedirectError(error)) throw error;
      // Mostramos alert de error.
      setAlertLevel("error");
      setAlertMessage(error.message);
    }
  }

  function handleAlertAccept() {
    // Limpiamos el mensaje para cerrar la alerta
    setAlertMessage(null);

    // Si fue éxito, redirigimos después de cerrar la alerta
    if (alertLevel === "success") {
      router.push("/");
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <video className="absolute top-0 left-0 w-full h-full object-cover" src="/video/campos2s.mp4" muted loop></video>

      {/* Renderizamos el alert solo si hay mensaje */}
      {alertMessage && <Alert message={alertMessage} level={alertLevel} onAccepted={handleAlertAccept} />}

      <div className="bg-white absolute rounded-lg shadow-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">¡Bienvenido de nuevo!</h1>

        <form onSubmit={authenticate} className="space-y-4" noValidate>
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

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

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
