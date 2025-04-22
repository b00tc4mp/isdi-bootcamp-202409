import {validate} from 'com';

const getPosts = callback => {
    validate.callback(callback);

    const xhr = new XMLHttpRequest;

    xhr.addEventListener('load', () => {
        const {status, response} = xhr;

        if(status === 200){
            const posts = JSON.parse(response);

            callback(null, posts)

            return;
        }

        const {error, message} = JSON.parse(response);

        callback(new Error(message));
    });

    xhr.open('GET', 'http://localhost:8080/posts');
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`);
    xhr.send();
    
}

export default getPosts