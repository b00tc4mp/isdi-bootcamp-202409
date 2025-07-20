const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/674cc973b9865836b1182a7e/username')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjYzk3M2I5ODY1ODM2YjExODJhN2UiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzA4Nzk4MCwiZXhwIjoxNzM0Mjk3NTgwfQ.gNK4SeFwiiuT5BBrpYo5vwfXcgBmOE5T_381eGhCB8c')
xhr.send()

// 200 '"javi"'