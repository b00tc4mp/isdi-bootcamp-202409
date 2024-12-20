import { errors } from 'com'

const { SystemError } = errors

export default async () => {
    const url = `http://${import.meta.env.VITE_API_URL}/services`; 

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.token}` 
            }
        });

        if (!response.ok) {
            const { error, message } = await response.json();
            throw new errors[error](message);
        }

        return await response.json(); 
    } catch (error) {
        throw new SystemError(error.message); 
    }
};
