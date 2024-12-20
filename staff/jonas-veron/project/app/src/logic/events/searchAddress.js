import { validate, errors } from "com"
const NOMINATIM_URL = "https://nominatim.openstreetmap.org"

const { SystemError } = errors

export default function searchAddress(query) {
  validate.text(query)
  return fetch(
    `${NOMINATIM_URL}/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5&countrycodes=es`
  )
    .catch((error) => {
      throw new SystemError(
        "Hubo un problema al buscar la dirección. Por favor, intenta de nuevo."
      )
    })
    .then((res) => {
      if (res.ok) {
        return res
          .json()
          .catch((error) => {
            throw new SystemError(error.message)
          })
          .then((data) => {
            return data.map((item) => ({
              label: item.display_name,
              value: {
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon),
                province: item.address.province || item.address.city,
                address: item.display_name,
              },
            }))
          })
      }

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(({ error, message }) => {
          throw new errors[error](message)
        })
    })
}
