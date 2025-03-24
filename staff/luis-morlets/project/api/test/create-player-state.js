const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/players')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRmODBlNzIxNDY1YWE0ODIyZjViMDIiLCJpYXQiOjE3MzM5MTE4NjUsImV4cCI6MTczNTEyMTQ2NX0.TdLzpv55l91cxhzqHvWsMukJoqx480hjh7ElO1ercmg')
xhr.send()