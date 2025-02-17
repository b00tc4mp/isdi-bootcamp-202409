const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.setRequestHeader('Authorization', 'Basic m2x9yvtmjgu')
xhr.send('{"image": "https://i.pinimg.com/736x/7b/45/48/7b4548987582999980e7ac720cfd504a.jpg", "text":"El Libertador"}')