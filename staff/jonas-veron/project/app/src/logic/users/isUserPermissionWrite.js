import { extractPayloadFromJWT } from "../../utils"

export default () =>
  extractPayloadFromJWT(localStorage.token).permission === "write"
