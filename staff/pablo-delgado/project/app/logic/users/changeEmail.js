import { errors } from '../../../com';
const { SystemError } = errors;

export default async function changeEmail(newEmail) {
    const token = localStorage.getItem('token');
    if (!token) throw new SystemError('Token not found');

    const apiUrl = import.meta.env.VITE_API_URL;

    const res = await fetch(`${apiUrl}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail })
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new (errors[errorData.error] || SystemError)(errorData.message || 'Unable to change email');
    }
}
