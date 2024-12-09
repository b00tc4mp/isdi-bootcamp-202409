import { errors } from 'com'

const { SystemError } = errors

export default (category, keyword = null) => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/products/search`)
  url.searchParams.append('category', category); // Siempre agregar categoría

  if (keyword) {
    url.searchParams.append('keyword', keyword); // Agregar keyword solo si está definida
  }

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    },
  })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.ok)
        return res.json()
          .catch(error => { throw new SystemError(error.message) })

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(({ error, message }) => { throw new errors[error](message) })
    })
}