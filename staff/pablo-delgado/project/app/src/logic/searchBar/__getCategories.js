import { errors } from 'com';

const { SystemError } = errors;

const API_URL = `http://${import.meta.env.VITE_API_URL}/api`;

export const getCategories = () =>
    fetch(`${API_URL}/categories`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`, //agrega token
        },
    })
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(res => {
            if (res.ok) {
                return res.json().catch(error => {
                    throw new SystemError(error.message);
                });
            }

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message);
                })
                .then(({ error, message }) => {
                    throw new errors[error](message);
                });
        });

export const getProvidersByCategory = (categoryId) =>
    fetch(`${API_URL}/categories/${categoryId}/provider`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    })
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(res => {
            if (res.ok) {
                return res.json().catch(error => {
                    throw new SystemError(error.message);
                });
            }

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message);
                })
                .then(({ error, message }) => {
                    throw new errors[error](message);
                });
        });
