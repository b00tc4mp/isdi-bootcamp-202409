import { extractPayloadFromJWT } from "../../utils"

export default () => {
  try {
    const token = localStorage.token
    if (!token) return false

    const payload = extractPayloadFromJWT(localStorage.token)
    return payload.role === "organizer"
  } catch (error) {
    console.error(error)
    return false
  }
}
