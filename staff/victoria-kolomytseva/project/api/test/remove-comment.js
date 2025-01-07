import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/posts/675ab9eddc1783fdcb000e77/comments/675f0588b9998c8e88a8c96a', {
    method: 'DELETE',
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NDc4MCwiZXhwIjoxNzM0Mjg4MzgwfQ.r_lSRWKkBwHEtgAo1vJO4YfE3osa8gj6QZeGp6OlRCM',
    },
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok)
            return

        return res.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(({ error, message }) => { throw new errors[error](message) })
    })
