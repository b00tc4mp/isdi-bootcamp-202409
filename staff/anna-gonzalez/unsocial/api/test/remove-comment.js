const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2w6j6gxyd/comments/m31jbrezyeq')
xhr.setRequestHeader('Authorization', 'Basic m2w6ehc8bg')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()

//200 ''