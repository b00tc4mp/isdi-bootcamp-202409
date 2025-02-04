import { errors } from "com";
import { extractPayloadFromJWT } from "../../util";

const { SystemError } = errors

export default () => {
    // Extract userId from JWT token
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token);

    // Set up the URL for the API request
    const url = `http://${import.meta.env.VITE_API_URL}/users/center/home-center/${userId}`;

    // Define headers with the Authorization token
    const headers = {
        Authorization: `Bearer ${sessionStorage.token}`
    };

    // Fetch with error handling
    return fetch(url, { headers })
        .catch(error => { throw new SystemError(error.message) }) // Catch network errors
        .then(res => {
            if (res.ok) {
                // If the response is successful, return the JSON data
                return res.json()
                    .catch(error => { throw new SystemError(error.message) }); // Handle JSON parsing errors
            }

            // Handle errors if the response is not OK
            return res.json()
                .catch(error => { throw new SystemError(error.message) }) // Handle JSON parsing errors
                .then(({ error, message }) => {
                    // Map API errors to custom error messages
                    throw new SystemError[error](message);
                });
        });
};


/* import { extractPayloadFromJWT } from "../../util"

// getUserCenter.js
export const getUserCenter = async () => {
    const token = sessionStorage.getItem('token');
    // If no token found, throw error
    if (!token) {
        throw new Error("Token missing or invalid");
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    // Fetch the full user details (including registration info)
    // API URL to fetch the full user data
    const url = `http://${import.meta.env.VITE_API_URL}/users/center/home-center`;
    return fetch(url, { headers })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error ${res.statusText}`);
            }
            return res.json();  // Assuming this returns the complete user data
        })
        .then((data) => {
            if (data?.error) {
                throw new Error(data.error);
            }
            return data;  // Return full user details like address, city, etc.
        })
        .catch((error) => {
            console.error("Fetch failed:", error.message);
            throw new Error(error.message);
        });
}

export default getUserCenter */