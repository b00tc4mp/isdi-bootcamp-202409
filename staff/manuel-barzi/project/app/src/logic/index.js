import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import getUserId from './getUserId'
import getUserRole from './getUserRole'
import isUserRoleRegular from './isUserRoleRegular'
import isUserRoleModerator from './isUserRoleModerator'

import savePlayerState from './savePlayerState'
import getPlayersState from './getPlayersState'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    getUserId,
    getUserRole,
    isUserRoleRegular,
    isUserRoleModerator,

    savePlayerState,
    getPlayersState
}

export default logic