import { extractPayloadJWt } from "../../util"

export default () => extractPayloadJWt(localStorage.token).sub