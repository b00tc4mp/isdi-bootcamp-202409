import { extractPayloadFromJWT } from "../../util"

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

export default getUserCenter