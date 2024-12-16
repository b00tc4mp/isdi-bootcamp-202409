const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNjkwMjFkNDkzZTZlYTFkMjU1MzIiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzkyNjQ5NywiZXhwIjoxNzMzOTMwMDk3fQ.jcI778GOX5LFRBVz7PpM7JESiCncuERlYrH5NwMAjAE'
const productId = '674b3627f5a3f200a06f4176'
const quantity = 1

fetch(`http://localhost:7000/cart/updates/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        productId,
        quantity
    })
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
    });