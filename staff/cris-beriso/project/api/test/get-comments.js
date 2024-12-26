const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/products/67509e32297104a530d722f6/comments')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwOWUzMTI5NzEwNGE1MzBkNzIyYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMzMzY2NjgsImV4cCI6MTczMzM0MDI2OH0.w5T6ts3bUiZ4qRCncIJIk9cUDQPPkkn6KNOJ3a9oHYM')
xhr.send()