const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2wawcrxzki')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send('{"image":"https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg", "text":"Hola Mundo!!!"}')