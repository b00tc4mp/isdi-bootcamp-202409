import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [
    { id: uuid(), name: 'Angel', email: 'angel@grillo.com', username: 'angel', password: '123123123' }
]

storage.posts = []

console.log(storage.users)