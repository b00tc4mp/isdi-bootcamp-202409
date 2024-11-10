const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/672f7aef4ee4e332926502a9/likes')
xhr.setRequestHeader('Authorization', 'Basic 672e233ebd3432d3ba964533')
xhr.send()