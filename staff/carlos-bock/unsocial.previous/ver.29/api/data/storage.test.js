import uuid from './uuid.js';

import storage from './storage.js';

storage.users = [
    { id: uuid(), name: 'Puss in Boots', email: 'el_gato@boots.com', username: 'elgatoguay', password: '123123123' }
];

storage.posts = [];

console.log(storage.users);