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
        throw new SystemError(error.message)
    })
    .then(async (res) => {
        if (res.ok) {
            console.log(res.status)
            const body = await res.json()
            console.log(body)
        }
        else console.log(res.status)
    })
