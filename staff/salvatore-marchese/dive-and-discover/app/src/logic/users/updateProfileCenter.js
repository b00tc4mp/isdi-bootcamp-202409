import { errors } from 'com'
import { extractPayloadFromJWT } from '../../util'
const { SystemError } = errors

export default async (userId, data) => {
    console.log
    console.log(data)
    // check if a token exists
    const user = extractPayloadFromJWT(sessionStorage.token);
    if (!user) return;

    const url = `http://${import.meta.env.VITE_API_URL}/users/center/center-info`;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.token}`
    };

    console.log(JSON.stringify(data))

    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify(data)
    };
    return fetch(url, requestOptions)
        .then(data => data)
        .catch(error => { throw new SystemError(error.message) })
}