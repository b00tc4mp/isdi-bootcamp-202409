import { authenticateUser, registerUser, getUser, getUserPets } from './users/index.js'

import { registerPet, getPets, registerHistory, getHistoriesPets, updateVaccinesDewornsPet } from './veterinary/index.js'




const logic = {
    authenticateUser,
    registerUser,
    getUser,
    getUserPets,

    registerPet,
    getPets,
    registerHistory,
    getHistoriesPets,
    updateVaccinesDewornsPet
}

export default logic