import { errors } from 'com'

const { SystemError } = errors

fetch(`http://localhost:8080/posts/675ab9eddc1783fdcb000e77`, {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4MTM1OSwiZXhwIjoxNzM0Mjg0OTU5fQ.G0KoMe9EoY9Qt9v1UD9Hr2OONjwo--p-DIweyaDOisQ`
    }
})
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok) {
            console.log(res.status)
        }
        else console.log(res.status)
    })


