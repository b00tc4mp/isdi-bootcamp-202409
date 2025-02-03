const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2x6bfznwyj/comments')
xhr.setRequestHeader('Authorization', 'Basic m2ey7tvjg0t')
xhr.send()