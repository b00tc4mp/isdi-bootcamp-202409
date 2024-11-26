const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:7070/posts')
xhr.setRequestHeader('Authorization', 'Basic m2x3s1fei2j')
xhr.send()