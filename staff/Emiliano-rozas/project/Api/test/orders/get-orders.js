fetch('http://localhost:7000/orders', {
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
        console.log('Orders:', data);
    })
    .catch(error => {
        console.log('Error:', error);
    });