const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzMzM1NDM3LCJleHAiOjE3MzMzMzkwMzd9.X-Mne0s_k1YTb9pC5q8QPKHVo4ph1WJXnuGj5tL_Ak4'
const cartItemId = '674b3627f5a3f200a06f4173'
const newQuantity = 4

fetch('http://localhost:7000/cart/update/:cartItemId', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        newQuantity
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