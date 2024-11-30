import { registerUser, loginUser, isUserRoleModerator, isUserRoleRegular, isUserLoggedIn, logoutUser } from './users/index';


const logic = {
    registerUser,
    loginUser,
    isUserRoleModerator,
    isUserRoleRegular,
    isUserLoggedIn,
    logoutUser
}

export default logic