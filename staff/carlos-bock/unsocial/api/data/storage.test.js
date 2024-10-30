import uuid from './uuid';

import storage from './storage.js';

storage.users = [
    { id: uuid(), name: 'Puss in Boots', email: 'el_gato@boots.com', username: 'pepitogrillo', password: '123123123' }
];

storage.posts = [];

console.log(storage.users);