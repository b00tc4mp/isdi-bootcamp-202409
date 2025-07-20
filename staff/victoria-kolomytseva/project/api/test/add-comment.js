import { errors } from 'com'

const { SystemError } = errors

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NDc4MCwiZXhwIjoxNzM0Mjg4MzgwfQ.r_lSRWKkBwHEtgAo1vJO4YfE3osa8gj6QZeGp6OlRCM'
const postId = '675ab9eddc1783fdcb000e77'
const text = 'Hello world'

fetch(`http://localhost:8080/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
})
    .catch((error) => {
        throw new SystemError(error.message)
    })
    .then((res) => {
        if (res.ok) console.log(res.status)
        else console.log(res.status)
    })
