import { errors } from "com"

const { SystemError } = errors

export default function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new SystemError("Geolocalización no está soportada en este navegador")
      )
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve([latitude, longitude])
      },
      (error) => {
        let message
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Permiso denegado para obtener la ubicación."
            break
          case error.POSITION_UNAVAILABLE:
            message = "La información de ubicación no está disponible."
            break
          case error.TIMEOUT:
            message = "La solicitud para obtener la ubicación expiró."
            break
          default:
            message = "Ocurrió un error desconocido."
        }
        reject(new SystemError(message))
      }
    )
  })
}
