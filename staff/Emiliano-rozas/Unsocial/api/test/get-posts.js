const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.send()