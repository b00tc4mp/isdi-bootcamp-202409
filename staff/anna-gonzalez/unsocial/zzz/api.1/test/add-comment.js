const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2w6j6gxyd/comments')
xhr.setRequestHeader('Authorization', 'Basic m2w6ehc8bg')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text":"hello world"}')

//201 ''