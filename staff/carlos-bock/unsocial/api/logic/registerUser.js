import {storage, uuid} from '../data/index.js';

import validate from './helpers/validate.js';

const registerUser = (name, email, username, password, passwordRepeat) => {
    validate.name(name);
    validate.email(email);
    validate.username(user);
    validate.password(password);
    validate.passwordsMatch(password,passwordRepeat);

    const {users} = storage;

    let user = users.find ( user => user.username === username || user.email === email);

    user = {id: uuid(), name: name, email: email, username: username, password: password};

    users.push(user);
}

export default registerUser;