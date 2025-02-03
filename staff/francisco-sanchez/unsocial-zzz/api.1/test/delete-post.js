const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/672f7af04ee4e332926502aa')
xhr.setRequestHeader('Authorization', 'Basic 672e2707de7dde80ec9233c6')
xhr.send()