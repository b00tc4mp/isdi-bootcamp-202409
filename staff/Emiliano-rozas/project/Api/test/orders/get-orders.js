const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVlZGI2MDY0YzRhYjI4ZjE0MzRkZGEiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzM0MzM3NTQzLCJleHAiOjE3MzQzNDExNDN9.tmjT9X02jh4ztjlnYhpYbpPD9Kwm8HqkiTHJ42eFR1A'

fetch('http://localhost:7000/orders', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => {
        console.log(response.status) // Ddbería ser 200 si la solicitud tuvo éxito.
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log('Error:', error)
    })