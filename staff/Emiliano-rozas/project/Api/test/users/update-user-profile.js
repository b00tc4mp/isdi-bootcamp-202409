const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNjkwMjFkNDkzZTZlYTFkMjU1MzIiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDA5MDM4MSwiZXhwIjoxNzM0MDkzOTgxfQ.GW84fpKkX3Z49ZcLKy_SdQzJ-5XKR8Ey7Fe0VyxfbsM'

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
        console.log(`Status Code: ${response.status}`);
        return response.text(); // Usamos .text() en lugar de .json() para ver la respuesta completa en caso de error.
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });