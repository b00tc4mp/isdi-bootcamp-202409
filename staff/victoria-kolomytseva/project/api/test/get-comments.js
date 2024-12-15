import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/posts/675ab9eddc1783fdcb000e77/comments', {
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI3OTgwMiwiZXhwIjoxNzM0MjgzNDAyfQ.JIZlnt-8Kfq9ToLO1sDxBP3aksJs5EsItWSaBvv2K5c',
    },
}).catch((error) => {
    console.log(error)
    throw new SystemError(error.message)
})
    .then(async (res) => {
        if (res.ok) {
            console.log(res.status)
            console.log(await res.json())
        }
        else console.log(res.status)
    })

