const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2xaozivndc/comments')
xhr.setRequestHeader('Authorization', 'Basic m2wd7pkr7xq')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text": "Que dice Bolivita"}')