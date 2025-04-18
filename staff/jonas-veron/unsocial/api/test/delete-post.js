const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2xk6oyrr3h')
xhr.setRequestHeader('Authorization', 'Basic m2wawcrxzki')
xhr.send()