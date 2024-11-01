const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2vw4ucygv')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.send()
