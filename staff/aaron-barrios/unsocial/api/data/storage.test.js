import uuid from './uuid'

import storage from './storage'

storage.users = [
    { id: uuid(), name: 'Aaron', email: 'aaron@bam.com', username: 'aaron', password: '123' }
]

storage.posts = []

console.log(storage.users)