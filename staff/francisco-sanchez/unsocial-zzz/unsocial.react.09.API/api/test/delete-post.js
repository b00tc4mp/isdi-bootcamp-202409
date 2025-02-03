const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost8080/posts/m2xgb3k6g8')
xhr.setRequestHeader('Authorization', 'Basic m2ey7tvjg0t')
xhr.send