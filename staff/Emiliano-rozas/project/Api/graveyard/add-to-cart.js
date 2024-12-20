const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzNTAwMTc2LCJleHAiOjE3MzM1MDM3NzZ9.7NTzF8lVMqjzQRDZ4mNUWu0ww6WHW6l6jo3D2qh4BNU'
const productId = '674b3627f5a3f200a06f4173'
const quantity = 1

fetch('http://localhost:7000/carts/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Necesitamos el token para autorizar la solicitud
    },
    body: JSON.stringify({
        productId,
        quantity
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