const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2xd209dlv')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()