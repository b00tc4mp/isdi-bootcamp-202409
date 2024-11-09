const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2x6bfznwyj/comments/m3336d7f529')
xhr.setRequestHeader('Authorization', 'Basic m2osxzzmwg6')
xhr.send()