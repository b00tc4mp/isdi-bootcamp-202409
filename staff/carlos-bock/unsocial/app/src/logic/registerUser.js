import { validate, errors } from 'com';

const { SystemError } = errors;

const registerUser = (name, email, username, password, passwordRepeat, callback) => {
    validate.name(name);
    validate.email(email);
    validate.username(username);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);
    validate.callback(callback);

    const xhr = new XMLHttpRequest;

    xhr.addEventListener('load', () => {
        const { status, response} = xhr;

        if (status === 201) {
            callback(null); 

            return;
        }

        const { error, message } = JSON.parse(response);

        const constructor = errors[error];

        callback(new constructor(message));
    })

    xhr.addEventListener('error', () => callback(new SystemError('server error')));


    xhr.open('POST', 'http://localhost:8080/register');//    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/users`)
    xhr.setRequestHeader('Conent-Type', 'application/json');
    xhr.send(JSON.stringify({name,email, username, password, 'password-repeat': passwordRepeat}));
};
export default registerUser;
