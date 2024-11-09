const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost8080/posts/672e436bf22e91cf5abb4778')
xhr.setRequestHeader('Authorization', 'Basic 672e2ff11dbad3a5583531bf')
xhr.send