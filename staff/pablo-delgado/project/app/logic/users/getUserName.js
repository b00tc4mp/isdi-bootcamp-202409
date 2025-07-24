import { errors } from '../../../com'
import { extractPayloadFromJWT } from '../../util'

const { SystemError } = errors;

export default async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new SystemError('Token not found in localStorage');

        const { sub: userId } = extractPayloadFromJWT(token);

        const apiUrl = import.meta.env.VITE_API_URL?.startsWith('http')
            ? import.meta.env.VITE_API_URL
            : `http://${import.meta.env.VITE_API_URL || 'localhost:8080'}`;

        const response = await fetch(`${apiUrl}/users/${userId}/name`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new (errors[errorData.error] || SystemError)(errorData.message || 'Unknown error');
        }

        const { name } = await response.json();
        return name;
    } catch (error) {
        throw new SystemError(error.message);
    }
};