const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzNTAwMTc2LCJleHAiOjE3MzM1MDM3NzZ9.7NTzF8lVMqjzQRDZ4mNUWu0ww6WHW6l6jo3D2qh4BNU'
const orderId = '67531dd5a35aeb0a651697f6'
const status = 'confirmed'

fetch(`http://localhost:7000/orders/update/${orderId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        status
    })
}).then(response => {
    console.log(response.status)
    return response.text() // Usamos .text() en lugar de .json() para ver la respuesta completa en caso de error.
})
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    })