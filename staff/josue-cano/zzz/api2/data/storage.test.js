import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [
    { id: uuid(), name: 'Josue', email: 'josue@grillo.com', username: 'flash', password: '123123123' }
]

storage.posts = []

console.log(storage.users)