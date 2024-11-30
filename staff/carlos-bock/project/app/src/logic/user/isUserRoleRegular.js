import extractPayloadFromJWT from '../../util/extractPayloadJWT.js'

const isUserRoleRegular = () => extractPayloadFromJWT(localStorage.token).role === 'regular'

export default isUserRoleRegular