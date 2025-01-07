import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/posts/675ab9eddc1783fdcb000e77/likes`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NTQzMSwiZXhwIjoxNzM0Mjg5MDMxfQ.A5s1eUFa8ZuVkeuWZGka0g7TtoLrLnOG-Vi_OaodUjE` }
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })