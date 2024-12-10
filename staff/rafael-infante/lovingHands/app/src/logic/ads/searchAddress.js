import { validate, errors } from 'com'

const { SystemError } = errors

export default (query) => {
  validate.text(query, 'query')

  return fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5&countrycodes=es`
  )
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok) {
        return res.json().catch((error) => {
          throw new SystemError(error.message)
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
    .then((data) => {
      return data.map((item) => ({
        label: item.display_name,
        value: {
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          address: item.address.town || item.address.village || item.address.city,
        },
      }))
    })
}
