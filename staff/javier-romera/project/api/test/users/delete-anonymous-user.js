const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/users/anonymous')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjBkMjhmODI1ZmMyNmJmMjg5YzMiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzgyODg1MCwiZXhwIjoxNzM1MDM4NDUwfQ.BmxURgeyEsbcSliO8MlSj1rioai1A_uz8aDolQupZTs')
xhr.send()

// 200 2