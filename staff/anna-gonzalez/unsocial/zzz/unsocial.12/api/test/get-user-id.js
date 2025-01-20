const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/m2w6ehc8bg')
xhr.send()

//200 '"m2w6ehc8bg"'