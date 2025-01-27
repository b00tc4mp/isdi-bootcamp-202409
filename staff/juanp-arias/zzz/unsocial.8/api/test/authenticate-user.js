const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:7070/authenticate')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"pepitogrillo","password":"123456"}')