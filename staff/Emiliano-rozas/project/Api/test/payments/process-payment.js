const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNjkwMjFkNDkzZTZlYTFkMjU1MzIiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzkyNjQ5NywiZXhwIjoxNzMzOTMwMDk3fQ.jcI778GOX5LFRBVz7PpM7JESiCncuERlYrH5NwMAjAE'
const orderId = '674b3627f5a3f200a06f4177'
const paymentMethodId = 'pm_card_visa'
const provider = 'stripe'

fetch(`http://localhost:7000/payments/intent`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
        orderId,
        paymentMethodId,
        provider,
    }),
})
    .then(response => {
        console.log(response.status)
        return response.text() // Usamos .text() en lugar de .json() para ver la respuesta completa en caso de error.
    })
    .then(data => {
        console.log('Response:', data)
    })
    .catch(error => {
        console.error('Error:', error)
    });
