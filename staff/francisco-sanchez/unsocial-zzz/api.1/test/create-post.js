const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2ey7tvjg0t')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://plus.unsplash.com/premium_photo-1695582638376-bd4ab9c3d9bd?q=80&w=2985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","text":"Buuuuuuuuuuuuuu!"}')