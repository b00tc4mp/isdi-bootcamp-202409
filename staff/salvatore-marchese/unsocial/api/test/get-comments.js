const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2eo2tqvg06/comments')
xhr.setRequestHeader('Authorization', 'Basic m2vw4ucygv')
xhr.send()