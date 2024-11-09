const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2x6bfznwyj/likes')
xhr.setRequestHeader('Authorization', 'Basic m2osxzzmwg6')
xhr.send()