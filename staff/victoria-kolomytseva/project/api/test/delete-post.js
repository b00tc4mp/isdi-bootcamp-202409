import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/posts/6759db4f6c3c6cd877ad6af9', {
    method: 'DELETE',
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI3NzkxMCwiZXhwIjoxNzM0MjgxNTEwfQ.tHrhHeXo2CJFVCih16HAvDJBg_Uyocxmawl8nd7TImQ',
    },
})
    .catch((error) => {
        throw new SystemError(error.message)
    })
    .then((res) => {
        if (res.ok) return

        return res
            .json()
            .catch((error) => {
                throw new SystemError(error.message)
            })
            .then(({ error, message }) => {
                throw new errors[error](message)
            })
    })
