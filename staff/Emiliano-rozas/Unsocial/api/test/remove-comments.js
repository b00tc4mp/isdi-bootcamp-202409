const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)

})

xhr.open('DELETE', 'http://localhost:8080/posts/m2x41ymgqk/comments/m2yx56t6fcg')
xhr.setRequestHeader('Authorization', ' Basic m2vvqdtgcba')
xhr.send()