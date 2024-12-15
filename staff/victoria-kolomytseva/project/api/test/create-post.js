import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/posts', {
    method: 'POST',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI3NDAyMSwiZXhwIjoxNzM0Mjc3NjIxfQ.-Ral8KSe6KhUcFT9XXCXEoKqB8N3Ynjjx6hmb_0706M',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        image: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
        whatHappened: "lost",
        petType: "dog",
        petGender: "male",
        text: "lost my dog",
        location: {
            "type": "Point",
            "coordinates": [
                41.5064041,
                2.3913883
            ],
            "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
            "province": "Barcelona"
        },
    }),
})
    .catch((error) => {
        throw new SystemError(error.message)
    })
    .then((res) => {
        if (res.ok) return

        return res
            .json()
            .catch((error) => {
                throw new SystemError(error)
            })
            .then(({ error, message }) => {
                throw new errors[error](message)
            })
    })






