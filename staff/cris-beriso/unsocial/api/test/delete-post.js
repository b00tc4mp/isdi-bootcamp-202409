const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/672e264adba2254072ee1db4')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.send()
