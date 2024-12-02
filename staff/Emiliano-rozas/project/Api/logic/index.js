import {
    registerUser,
    authenticateUser
} from './users/index.js'

import {
    getProducts,
    createProduct
} from './products/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getProducts,
    createProduct
}
export default logic