const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/matches/6846df9fa87f9edce14ed2bd/messages')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODQ1ZjY3YWZjMDM1N2FjOWMxMDI0NTkiLCJpYXQiOjE3NDk0NjY1MTksImV4cCI6MTc0OTUwOTcxOX0.75gIhdXeqyiOhDZnYqtzCad8kXUK41GK3KmgQflrGOA')
xhr.send()