const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/comments')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"postId":"m2vw4ucygv","text":"Mr potato"}')  