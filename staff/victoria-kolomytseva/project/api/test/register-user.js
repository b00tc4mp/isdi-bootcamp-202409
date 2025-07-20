import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/users`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NzY2OSwiZXhwIjoxNzM0MjkxMjY5fQ.hlEXDx9MqEBxlELoJq1n6AsdzaXnnA2wOD0PaFx8o3M`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: 'Antonete',
        email: 'antonete@test.com',
        password: '123123123',
        'password-repeat': '123123123'
    })
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })