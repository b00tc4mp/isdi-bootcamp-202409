const xhr = new XMLHttpRequest 

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

        xhr.open("DELETE", 'http://localhost:8080/posts/m2vw4ucygv/comments/m2eo2tqvg06')
        xhr.setRequestHeader('Authorization', 'Basic m2eo2tqvg06')

        xhr.send() // No need to send data for a DELETE request