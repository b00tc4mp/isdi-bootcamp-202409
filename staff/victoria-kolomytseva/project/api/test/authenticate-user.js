import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/users/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'vkolomytseva87@gmail.com',
        password: '123123123',
    }),
})
    .catch((error) => {
        console.log(error)
        throw new SystemError(error.message)
    })
    .then((res) => {
        if (res.ok) console.log(res.status)
        else console.log(res.status)
    })
