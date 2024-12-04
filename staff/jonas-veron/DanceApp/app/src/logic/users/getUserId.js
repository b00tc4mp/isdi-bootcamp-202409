import extractPayloadFromJWT from "../../util/extractPayloadFromJWT.js"

export default () => extractPayloadFromJWT(localStorage.token).sub
