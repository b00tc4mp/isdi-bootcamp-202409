const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost.com:8080/users/672e21dabd3432d3ba964532/name')
xhr.setRequestHeader('Authorization', 'Basic 672e233ebd3432d3ba964533')
xhr.send()





/*const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/m2vvqdtgcba/name')
xhr.send()*/