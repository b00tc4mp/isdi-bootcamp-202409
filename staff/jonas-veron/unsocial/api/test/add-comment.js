const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2yqq9pvyi8/comments')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.setRequestHeader('Authorization', 'Basic m2wawcrxzki')
xhr.send('{"text":"holaaaa loquitooo!!"}')
