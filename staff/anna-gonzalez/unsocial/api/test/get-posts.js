const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2w6ehc8bg')
xhr.send()

//200 '[{"id":"m30h1nbvkrd","image":"http://invented-image.com","text":"hello world","author":{"id":"m2w6ehc8bg","username":"pepitogrillo"},"date":"2024-11-02T18:03:07.483Z","likes":[],"comments":1,"saves":[],"liked":false,"saved":false},{"id":"m2w6j6gxyd","image":"http://invented-image.com","text":"hello world","author":{"id":"m2w6ehc8bg","username":"pepitogrillo"},"date":"2024-10-30T17:57:44.961Z","likes":[],"comments":1,"saves":[],"liked":false,"saved":false}]'