import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [
    { id: uuid(), name: 'Juan Pablo', email: 'juan@pablo.com', username: 'juanpablo', password: '123456' }
]

storage.posts = []

console.log(storage.users)