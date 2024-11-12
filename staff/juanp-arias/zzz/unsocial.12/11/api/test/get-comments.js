const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:7070/posts/m32t2w8d0yi/comments')
xhr.setRequestHeader('Authorization', 'Basic m2x63gb7wns')
xhr.send()