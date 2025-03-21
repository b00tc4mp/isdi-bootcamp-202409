import { errors } from 'com';

const { SystemError } = errors;

async function getUserData() {
    const token = localStorage.token;
    if (!token) throw new Error('User not logged in');

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/me`, { // Cambio a /users/me
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json().catch(error => { throw new SystemError(error.message); });
        }
        return res.json()
            .catch(error => { throw new SystemError(error.message); })
            .then(({ error, message }) => { throw new errors[error](message); });
    })
}

// Exporta la función como default
export default getUserData;
