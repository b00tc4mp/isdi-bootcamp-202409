// import { validate, errors } from 'com'

// const { SystemError } = errors

// export default (currentDate) =>
//     validate.date(currentDate)

// fetch(`http://${import.meta.env.VITE_API_URL}/cycles/periodDays`, {
//     method: 'POST',
//     headers: {
//         Authorization: `Bearer ${localStorage.token}`,
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ currentDate })
// })
//     .catch(error => { throw new SystemError(error.message) })
//     .then(res => {
//         if (res.ok)
//             return

//         return res.json()
//             .catch(error => { throw new SystemError(error.message) })
//             .then(({ error, message }) => { throw new errors[error](message) })
//     })