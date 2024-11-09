const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic 672e2ff11dbad3a5583531bf')
xhr.send()