import { validate, errors } from 'com';

const { SystemError } = errors;

const addComments = (postId, text, callback) => {
    validate.id(postId, 'postId');
    validate.text(text);
    validate.callback(callback);

    const xhr = new XMLHttpRequest;
    
    xhr.addEventListener('load',() => {
        const {status, response} = xhr;

        if (status === 201){
            callback(null);

            return;
        };

        const {error, message} = JSON.parse(response);

        const constructor = errors[error];

        callback(new constructor(message));
    } );

    xhr.addEventListener('error', () => callback(new SystemError('server error')));

    xhr.open('POST', `http://localhost:8080/posts/${postId}/comments`);
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({text}));
}

export default addComments;