import { extractPayloadFromJWT } from "../../utils"

export default () => extractPayloadFromJWT(localStorage.token).sub
