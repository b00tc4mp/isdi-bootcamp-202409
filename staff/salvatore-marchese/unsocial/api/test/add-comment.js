const xhr = new XMLHttpRequest 

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open("POST", "http://localhost:8080/posts/m2vw4ucygv/comments")
xhr.setRequestHeader('Authorization', 'Basic m2eo2tqvg06')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text":"yeaaaah!"}')
