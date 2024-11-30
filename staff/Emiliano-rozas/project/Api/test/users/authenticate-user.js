fetch('http://localhost:7000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "venom",
        password: "123123123"
    })
})
    .then(response => {
        console.log(response.status)
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log('Error', error)
    })