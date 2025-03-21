import {
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleProvider,
    isUserRoleCustomer,
    getUserId,
    logoutUser,
    registerUser,
    searchProviders,
    getUserData
} from './users'

//import { getCategories } from './searchBar'
//import { SearchWithGeo } from './searchBar'
//import { searchServices } from './searchBar'
//import { getAllProviders } from './searchBar'

const logic = {
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleCustomer,
    isUserRoleProvider,
    getUserId,
    logoutUser,
    registerUser,
    //getAllProviders,
    searchProviders,
    getUserData
    //getCategories,
    //SearchWithGeo,
    //searchServices
}

export default logic