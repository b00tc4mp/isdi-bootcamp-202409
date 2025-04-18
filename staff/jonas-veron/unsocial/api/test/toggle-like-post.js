const xhr = new XMLHttpRequest

xhr.addEventListener('load', (req, res) => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2yqq9pvyi8')
xhr.setRequestHeader('Authorization', 'Basic m2yxig4w4f')
xhr.send()