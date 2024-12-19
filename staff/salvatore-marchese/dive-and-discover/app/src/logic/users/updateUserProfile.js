import { errors } from 'com'
import { extractPayloadFromJWT } from '../../util'
const { SystemError } = errors

export default async (data) => {
    console.log(data)
    // check if a token exists
    const user = extractPayloadFromJWT(sessionStorage.token);
    if (!user) return;

    const url = `http://${import.meta.env.VITE_API_URL}/users/diver/profile`;
    console.log(url)
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
        .then(async response => {
            console.log(response)
            // status 404 or 500 will set ok to false
            if (response.ok) {
                // Success: convert data received & run callback
                const result = await response.json();
                console.log(result)
                return result;
            } else {
                throw new SystemError(response.status + " Failed Fetch ");
            }
})
        .catch(error => { 
            console.log("an error occurred")
            throw new SystemError(error.message) 
        })
}