const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2yjwe5wdfs/likes')
xhr.setRequestHeader('Authorization', 'Basic m2w6ch7dkh')
xhr.send()