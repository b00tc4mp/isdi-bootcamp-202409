import { connect, disconnect } from 'mongoose'

import { PackConfig, User, Pack, History, Payment, AddressSchema } from './model.js'

import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    PackConfig,
    AddressSchema,
    User,
    Pack,
    History,
    Payment
}