import { validate, errors } from 'com';

const { SystemError } = errors;

const loginUser = (username, password) => {
    validate.username(username);
    validate.password(password);
    
    return fetch(`http://${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(token => { localStorage.token = token })

                return res.json()
                    .catch(error => { throw new SystemError(error.message)})
                    .then(({ error, message }) => { throw new errors[error](message)})
        })
}

export default loginUser;


/*

const loginUser = (username, password, callback) => {
    validate.username(username);
    validate.password(password);
    validate.callback(callback);
    
    const xhr = new XMLHttpRequest;

    xhr.addEventListener('load', () => {
        const { status, response } = xhr;

        if (status === 200) {
            const token = JSON.parse(response);

            localStorage.token = token;

            callback(null);

            return; 
        }

        const { error, message } = JSON.parse(response);

        const constructor = errors[error];

        callback(new constructor(message));
    });

    xhr.addEventListener('error', () => callback(new SystemError('server error')));

    xhr.open('POST', `http://${import.meta.env.VITE_API_URL}/users/auth`)
    xhr.setRequestHeader('Content-Type', 'application/json');
    const credentials = { username, password };
    xhr.send(JSON.stringify({ credentials }));   
}

export default loginUser;
*/