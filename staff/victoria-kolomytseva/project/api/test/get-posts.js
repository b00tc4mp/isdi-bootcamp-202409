import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/posts?whatHappened=lost`, {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NDAxNCwiZXhwIjoxNzM0Mjg3NjE0fQ.TP-hoOJNxhYcpBQBII9em38BzV90CH8JLf8CRElI0so`
    }
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })