import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/users`, {
    method: 'PUT',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI5NjA0MSwiZXhwIjoxNzM0Mjk5NjQxfQ.azlX4fDOugsN7j6As3gONcXp2jp-00gMMONbYFytYtQ`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: '675819916cafadad364cb097',
        name: 'Juan Pérez',
        surname: 'juanperez',
        phone: '684734576',
        city: 'Barcelona',
        postalCode: '08064'
    })
})

    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })
