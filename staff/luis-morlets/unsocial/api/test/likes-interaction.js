const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2xaozivndc/likes')
xhr.setRequestHeader('Authorization', 'Basic m2wd7pkr7xq')
xhr.send()