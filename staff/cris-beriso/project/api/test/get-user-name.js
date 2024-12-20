const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/674da16c73c1190c6ecffe93/name')
xhr.setRequestHeader('Authorization', 'Bearer 674da16c73c1190c6ecffe93')
xhr.send()