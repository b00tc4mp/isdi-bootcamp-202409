const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/characters')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjBkMjhmODI1ZmMyNmJmMjg5YzMiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzgzMjQ1NSwiZXhwIjoxNzM1MDQyMDU1fQ.y-V_7idjBOqtpI7HaoHalVV2CazTLDE8s7WPfo_kPxE')
xhr.send()