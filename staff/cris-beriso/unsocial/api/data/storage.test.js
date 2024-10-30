import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [
  { id: uuid(), name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: 'criscris' }
]

storage.posts = []

console.log(storage.users)