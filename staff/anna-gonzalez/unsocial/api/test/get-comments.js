const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2w6j6gxyd/comments')
xhr.send()

//200 '[{"id":"m31jbrezyeq","author":{"id":"m2w6ehc8bg","username":"pepitogrillo"},"text":"hello world","date":"2024-11-03T11:54:44.747Z"}]'