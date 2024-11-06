//import {validate} from './helpers'
import validate from './helpers/validate.js'
//import {validate} from '../helpers'
//import uuid from '../data/uuid'
const registerUser = (name, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    const xhr = new XMLHttpRequest;

    xhr.addEventListener('load', () => {
        const { status, response} = xhr;

        if (status === 201) {
            callback(null); 

            return;
        }

        const { error, message } = JSON.parse(response);//check why error is not used.

        callback(new Error(message));
    })

    xhr.open('POST', 'http://localhost:8080/register');
    xhr.setRequestHeader('Conent-Type', 'application/json');
    xhr.send(JSON.stringify({name,email, username, password, 'password-repeat': passwordRepeat}));
}

export default registerUser

/*
Prior code

const registerUser = (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error('user already exists');

    user = { id: uuid(),name: name, email: email, username: username, password: password }

    users.push(user);

    localStorage.users = JSON.stringify(users)
}

export default registerUser

*/