const xhr = new XMLHttpRequest

xhr.addEventListener('load', (req, res) => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2yqq9pvyi8/comments')
xhr.send()