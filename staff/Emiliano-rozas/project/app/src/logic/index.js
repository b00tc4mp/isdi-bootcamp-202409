import { getProducts } from './products/index';
import { registerUser, loginUser, isUserRoleModerator, isUserRoleRegular, isUserLoggedIn, logoutUser } from './users/index';


const logic = {
    registerUser,
    loginUser,
    isUserRoleModerator,
    isUserRoleRegular,
    isUserLoggedIn,
    logoutUser,
    getProducts
}

export default logic