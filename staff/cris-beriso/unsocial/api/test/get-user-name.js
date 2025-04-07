const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/672e234f9baf06973d87d0ad/name')
xhr.setRequestHeader('Authorization', 'Basic 672e234f9baf06973d87d0ad')
xhr.send()