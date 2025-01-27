const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:7070/posts/m3350oz0aog/likes')
xhr.setRequestHeader('Authorization', 'Basic m2x63gb7wns')
xhr.send()