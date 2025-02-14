import loginUser from './loginUser'
import registerUser from './registerUser'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import isLoggingVet from './isLoggingVet'
import getUser from './getUser'
import QrCodeGeneraitor from './QrCodeGenereitor'
import registerPet from './registerPet'
import getPets from './getPets'
import registerHistoryPet from './registerHistoryPet'
import getHistoriesPets from './getHistoriesPets'
import updateVaccinesDewornsPet from './updateVaccinesDewornsPet'
import getUserPets from './getUserPets'


const logic = {
    loginUser,
    registerUser,
    isUserLoggedIn,
    logoutUser,
    isLoggingVet,
    QrCodeGeneraitor,

    registerPet,
    registerHistoryPet,
    updateVaccinesDewornsPet,
    getUserPets,

    getPets,
    getUser,
    getHistoriesPets

}

export default logic