const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2x5opwqqap')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://imgs.search.brave.com/qJFCUICSuhAGFLNBvcENRsxrBEOBE46zgHMhWf4wDnA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA","text":"Buenos dias"}')