import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [
    { id: uuid(), name: 'Mario', email: 'mario@gmail.com', username: 'SuperMario', password: '12341234' }
]

storage.posts = []

console.log(storage.users)