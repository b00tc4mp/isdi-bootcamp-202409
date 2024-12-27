const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2yjwe5wdfs/comments')
xhr.setRequestHeader('Authorization', 'Basic m2w6ch7dkh')
xhr.send()