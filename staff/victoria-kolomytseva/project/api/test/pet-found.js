import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/posts/675f51c79fc723bb4929efd3/found`, {
    method: 'PATCH',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVmNTJiOGE1NjEyOWQwZGViYmVhOTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDQ0NTgwNSwiZXhwIjoxNzM0NDQ5NDA1fQ.OPdZstrSBIncU0EdfEokB6f3P7FgmBJeb5hgwDgiMr4
` }
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })