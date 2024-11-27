const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status,xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://media.giphy.com/media/QLiqUx7aHg10bl5FVj/giphy.gif?cid=790b7611k9bnssjixy10hu88u0buneurbrjffxxhlxderris&ep=v1_gifs_search&rid=giphy.gif&ct=g","text":"hallo weendy"}')