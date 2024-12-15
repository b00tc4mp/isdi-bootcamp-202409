import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/users/675819916cafadad364cb097`, {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NzA0MywiZXhwIjoxNzM0MjkwNjQzfQ.HkrA2ANe6w9hsz9jR5gTLKAu7USwwwDk9tsMlnfyZ3c`
    }
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })