import loginUser from './user/loginUser.js'
import registerUser from './user/registerUser.js'
import isUserLoggedIn from './user/isUserLoggedIn.js'
import isUserModerator from './user/isUserModerator.js'
import isUserRoleRegular from './user/isUserRoleRegular.js'

import getUserId from './user/getUserId.js'
import getUserName from './user/getUserName.js'
import getUserRole from './user/getUserRole.js'

const logic = {
    loginUser,
    registerUser,
    isUserLoggedIn,
    isUserModerator,
    isUserRoleRegular,

    getUserId,
    getUserName,
    getUserRole,


}

export default logic