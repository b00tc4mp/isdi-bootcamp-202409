const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:7070/posts/m32t2w8d0yi/comments')
xhr.setRequestHeader('Authorization', 'Basic m2x3s1fei2j')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"text":"heythere!"}')