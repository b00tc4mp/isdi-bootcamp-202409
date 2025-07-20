import { errors, validate } from "com"
const NOMINATIM_URL = "https://nominatim.openstreetmap.org"

const { SystemError } = errors

export default (query) => {
    validate.text(query)
    return fetch(`${NOMINATIM_URL}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=es`)
        .catch((error) => {
            throw new SystemError(error.message)
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().catch((error) => {
                    throw new SystemError(error.message)
                })
            }
            return res.json()
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
        .catch((error) => {
            throw new errors[error](message)
        })
}