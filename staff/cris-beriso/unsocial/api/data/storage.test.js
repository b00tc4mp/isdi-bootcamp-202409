import uuid from './uuid.js'

import storage from './storage.js'

storage.users = [ //Aqui estamos llamando al setter, no estamos llamando a una propiedad. JS tiene una forma especial de llamar a los setter
  { id: uuid(), name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: 'criscris' }
]

storage.posts = []

console.log(storage.users)