import { errors } from 'com'
const { SystemError } = errors

export default () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(new SystemError("Geo it's not support"))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve([latitude, longitude])
      },
      (error) => {
        let message
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Permission denied to obtain location."
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information is not available."
            break
          case error.TIMEOUT:
            message = "The request to obtain the location timed out."
            break
          default:
            message = "Unknown error"
        }
        reject(new SystemError(message))
      }
    )
  })

}