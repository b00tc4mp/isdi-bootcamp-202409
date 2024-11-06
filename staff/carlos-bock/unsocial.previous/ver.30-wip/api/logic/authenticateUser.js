import {storage} from '../data/index.js';
import validate from './helpers/validate.js';

const authenticateUser = (username, password) => {
    validate.username(username);
    validate.password(password);
    /*if (password.length < 8) throw new Error('invalid password');*/
    const {users} = storage;

    const user = users.find(user => user.username === username && user.password === password);

    if (user === undefined)
        throw new Error('wrong credientials');

    return user.id;
}

export default authenticateUser;