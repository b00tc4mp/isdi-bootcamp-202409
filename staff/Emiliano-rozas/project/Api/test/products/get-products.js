fetch('http://localhost:7000/products', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.status); // Debería ser 200 si la solicitud tuvo éxito.
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Error:', error);
    });
