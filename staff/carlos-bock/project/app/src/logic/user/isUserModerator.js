import extractPayloadFromJWT from '../../util/extractPayloadJWT.js'

const isUserModerator = () => extractPayloadFromJWT(localStorage.token).role === 'moderator'

export default isUserModerator