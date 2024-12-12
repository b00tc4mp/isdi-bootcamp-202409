const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/reminders/day/2024-12-11')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQwMDA4ODIsImV4cCI6MTczNjU5Mjg4Mn0.t9fF6M3K7ShydlMn5KaSl1irQLyNourMBGrNyJFg-J4')
xhr.send()