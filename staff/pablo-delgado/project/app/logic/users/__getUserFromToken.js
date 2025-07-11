import { jwtDecode } from 'jwt-decode'

export default function getUserFromToken() {
  const token = localStorage.token
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

export { getUserFromToken }