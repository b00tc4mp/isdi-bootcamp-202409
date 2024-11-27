import { errors } from 'com'; 
import extractPayloadFromJWT from '../util/extractPayloadFromJWT.js';
//import { extractPayloadFromJWT } from '../util';

const { SystemError } = errors;

const getUserName = () => {
  const { sub: userId } = extractPayloadFromJWT(localStorage.token);

  return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
    headers: {
        Authorization: `Bearer ${localStorage.token}`
    }
  })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok)
            return res.json()
                .catch(error => { throw new SystemError(error.message) })

        return res.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(({ error, message }) => { throw new errors[error](message)})
    })


};
export default getUserName;


/*

const getUserName = callback => {
    validate.callback(callback);
 
    const xhr = new XMLHttpRequest;
 
    xhr.addEventListener('load', () => { 
     const {status, response} = xhr;
 
     if (status === 200) {
         const name = JSON.parse(response);
 
         callback(null,name);
 
         return;
     }
 
     const { error, message } = JSON.parse(response);
 
     const constructor = errors[error];
 
     callback(new constructor(message));
     });
 
     xhr.addEventListener('error', () => callback(new SystemError('server error')));
 
     const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)
 
     xhr.open('GET', `http://${import.meta.env.VITE_API_URL}/users/${userId}/name`)
 
     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`);
     xhr.send();
 };
 export default getUserName;*/