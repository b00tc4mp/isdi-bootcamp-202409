const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2w6j6gxyd/saves')
xhr.setRequestHeader('Authorization', 'Basic m2w6ehc8bg')
xhr.send()

//200 ''