const xhr = new XMLHttpRequest()

const userId = 'm2eo2tqvg06'
const postId = 'm2vw4ucygv' 

xhr.open('DELETE', 'http://localhost:8080/delete-posts')
xhr.setRequestHeader('Authorization', 'Basic m2eo2tqvg06')
xhr.send()