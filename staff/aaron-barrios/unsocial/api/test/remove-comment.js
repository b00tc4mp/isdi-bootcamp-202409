const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2vw4ucygv/comments/m2yojtnh2c')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()