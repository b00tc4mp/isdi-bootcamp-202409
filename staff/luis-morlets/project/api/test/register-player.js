fetch('http://localhost:8080/players',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ('{"name":"Simon Bolivar","email":"simon@bolivar.com","username":"simoncito","password":"123123123","password-repeat":"123123123"}')
    })
    .then(res => res.body)
    .then(res => console.log(res))