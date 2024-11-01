import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [ //con el users este estoy llamando al setter de storage.js
    { id: uuid(), name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' }
]

storage.posts = []

console.log(storage.users)