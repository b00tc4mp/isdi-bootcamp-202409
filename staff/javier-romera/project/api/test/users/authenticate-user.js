const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users/auth')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"javi","password":"123123123"}')

// 200 '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjYzk3M2I5ODY1ODM2YjExODJhN2UiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzA4Nzk4MCwiZXhwIjoxNzM0Mjk3NTgwfQ.gNK4SeFwiiuT5BBrpYo5vwfXcgBmOE5T_381eGhCB8c"'