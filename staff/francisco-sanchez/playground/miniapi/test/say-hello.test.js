const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/sayhello')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({ nameUser: "Ron", surnameUser: "Weasley" }));
