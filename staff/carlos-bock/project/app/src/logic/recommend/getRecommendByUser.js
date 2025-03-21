import errors from '../../../../com/errors.js';

const { SystemError } = errors;

const getRecommendByUser = userId =>
    fetch(`http://${import.meta.env.VITE_API_URL}/recommends/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        });

export default getRecommendByUser
