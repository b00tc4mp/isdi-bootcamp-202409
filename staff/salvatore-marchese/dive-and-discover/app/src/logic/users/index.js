import registerUserDiver from "./registerUserDiver";
import registerUserCenter from "./registerUserCenter";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import { isUserLoggedIn } from "./isUserLoggedIn";

import isUserRoleCenter from "./isUserRoleCenter";
import isUserRoleDiver from "./isUserRoleDiver";
import getUser from "./getUser";
import updateUser from "./updateUser";
import getUserId from "./getUserId";
import getUserName from "./getUserName";


const logic = {
    registerUserDiver,
    registerUserCenter,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    isUserRoleDiver,
    isUserRoleCenter,
    getUser,
    updateUser,
    getUserId,
    getUserName 
}

export default logic 