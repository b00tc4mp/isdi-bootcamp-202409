const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/tips/menstruation/selfCareTips')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjAxNjQsImV4cCI6MTczNjk1MjE2NH0.Zdu_CCjdspGEDmI1ujQ6U7iQ3acbU1bQfJJbTEt1730')
xhr.send()

//200 '"Treat yourself to a face mask or skincare routine. It’s a small way to nurture yourself."'