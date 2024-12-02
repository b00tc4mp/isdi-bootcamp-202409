import extractPayloadFromJWT from "../../util/extractPayloadFromJWT.js"

export default () => extractPayloadFromJWT(locaStorage.token).sub
