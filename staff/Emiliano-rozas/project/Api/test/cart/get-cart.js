const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzMzg3NjE1LCJleHAiOjE3MzMzOTEyMTV9.UbDSXTk34k324TuieFPT2SFMfyKRPE6iurWkznUr868'

fetch('http://localhost:7000/cart', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Necesitamos el token para autorizar la solicitud
    }
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