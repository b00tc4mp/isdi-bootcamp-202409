import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { FaunaFlora } from './index.js'
//TODO add fauna and flora documents to databaese
db.connect(process.env.MONGO_URL)
    .then(() => FaunaFlora.deleteMany()) 
    .then(() => {
        
    })
    .then(() => {
        console.log('User population complete!')
    })
    .catch(console.error)
    .finally(() => db.disconnect())
