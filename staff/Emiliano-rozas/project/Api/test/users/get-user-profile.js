const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVjNzNmZGVhOWZiMGEyYTk2N2E5NzQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDE5Njg2NywiZXhwIjoxNzM0MjAwNDY3fQ.6JN5d48tx-UBCyHeKk1rohEp6IVV8ZfezdjhjHYclWo'
const userId = '674c73fdea9fb0a2a967a974'
const targetUserId = '675c7412de19fb0a2b967a98'

fetch(`http://localhost:7000/users/${targetUserId}/profile`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
})
    .then(response => {
        console.log(response.status)
        return response.text() // Usamos .text() en lugar de .json() para ver la respuesta completa en caso de error.
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
