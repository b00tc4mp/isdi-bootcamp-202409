const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2x69ey2d79/comments/m320io97u3')
xhr.setRequestHeader('Authorization', 'Basic m2x5tcx927f')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()