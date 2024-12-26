import registerUserDiver from "./registerUserDiver";
import registerUserCenter from "./registerUserCenter";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import { isUserLoggedIn } from "./isUserLoggedIn";
import searchCenters from "./searchCenters";

import isUserRoleCenter from "./isUserRoleCenter";
import isUserRoleDiver from "./isUserRoleDiver";
import getUserCenter from "./getUserCenter";
import getUser from "./getUser";
import updateUserProfile from "./updateUserProfile";
import getUserId from "./getUserId";
import getUserName from "./getUserName";
import updateProfileCenter from "./updateProfileCenter";


const logic = {
    registerUserDiver,
    registerUserCenter,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    isUserRoleDiver,
    isUserRoleCenter,
    getUserCenter,
    getUser,
    updateUserProfile,
    getUserId,
    getUserName,
    updateProfileCenter,
    searchCenters,
}

export default logic 