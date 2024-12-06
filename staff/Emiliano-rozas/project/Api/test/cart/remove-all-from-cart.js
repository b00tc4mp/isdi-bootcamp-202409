const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzMzg3NjE1LCJleHAiOjE3MzMzOTEyMTV9.UbDSXTk34k324TuieFPT2SFMfyKRPE6iurWkznUr868'
const cartItemId = '675165b9dee24c42cee43b0a'

fetch(`http://localhost:7000/cart/remove/${cartItemId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
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