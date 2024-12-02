fetch('http://localhost:8080/players/auth',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ('{"username":"manivela","password":"123123123"}')
    })
    .then(res => res.json())
    .then(res => console.log(res))