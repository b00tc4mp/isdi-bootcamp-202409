const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/675ff207b4215bb9c29f4cb2/name')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVmZjIwN2I0MjE1YmI5YzI5ZjRjYjIiLCJpYXQiOjE3MzQzNDcyMzAsImV4cCI6MTczNDM1MDgzMH0.4MoNk53-_KRLlR7_gra0JvR1URCtcSrJMTOsbVE49II')
xhr.send()