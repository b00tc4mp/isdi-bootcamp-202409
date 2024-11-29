const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2yjwo833ol')
xhr.setRequestHeader('Authorization', 'Basic m2w6ch7dkh')
xhr.send()