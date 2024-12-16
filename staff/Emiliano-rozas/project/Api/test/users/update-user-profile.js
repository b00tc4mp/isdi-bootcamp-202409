const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVjNzNmZGVhOWZiMGEyYTk2N2E5NzQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDE5Njg2NywiZXhwIjoxNzM0MjAwNDY3fQ.6JN5d48tx-UBCyHeKk1rohEp6IVV8ZfezdjhjHYclWo'

const street = 'calle falsa 123'
const phone = '+54321234321'
const city = 'Barcelona'
const country = 'ESPAÑA'
const postalCode = '1712'

fetch(`http://localhost:7000/users/profile/`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        street,
        phone,
        city,
        country,
        postalCode
    })
})
    .then(response => {
        console.log(response.status)
        return response.text(); // Usamos .text() en lugar de .json() para ver la respuesta completa en caso de error.
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });