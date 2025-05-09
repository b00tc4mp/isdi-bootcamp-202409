const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIicSn0piVklT9EupNPzy-80j7Yt3coUccg&s","text":"Mr potato"}')  