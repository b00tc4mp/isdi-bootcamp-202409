import { errors } from 'com'

const { SystemError } = errors

export default function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new SystemError('Geolocation is not supported by your browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        resolve({
          lat: 36.65911827117031,
          lon: -4.758748787000305,
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new SystemError('User denied the request for Geolocation.'))
            break
          case error.POSITION_UNAVAILABLE:
            reject(new SystemError('Location information is unavailable.'))
            break
          case error.TIMEOUT:
            reject(new SystemError('The request to get user location timed out.'))
            break
          default:
            reject(new SystemError('An unknown error occurred.'))
            break
        }
      }
    )
  })
}
