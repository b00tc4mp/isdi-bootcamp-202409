import { extractPayloadFromJWT } from '../../util'

export default async () => {
    // RETRIVE TOKEN SECURELY
    const token = sessionStorage.getItem('token');

    // CHECK TOKEN AVAILABILIY
    const user = extractPayloadFromJWT(sessionStorage.token);
    if (!token || user?.error) {
        console.error('Token missing or user not logged in!')
        throw new Error("User is not logged in.")
    }

    // API URL
    const url = `http://${import.meta.env.VITE_API_URL}/users/personal-info`;
    const headers = {
        Authorization: `Bearer ${sessionStorage.token}`
    };

    // FETCH WITH ERROR HANDLER 
    return fetch(url, { headers })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            return res.json()
        })
        .then((data) => {
            console.log("Fetch succeeded")
            console.log(data)
            if (data?.error) throw new Error(data.error)
            return data
        })
        .catch((error) => {
            console.error("Fetch failed:", error.message)
            throw new Error(error.message)
        })
}