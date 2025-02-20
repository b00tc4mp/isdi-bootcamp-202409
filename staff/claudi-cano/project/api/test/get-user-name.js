const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/m2vvqdtgcba/name')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.send()

// revisar los datos en mongoose