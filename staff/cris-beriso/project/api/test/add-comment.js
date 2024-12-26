const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/products/6750682520c253ee7da92a4e/comments')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwNjgyNDIwYzI1M2VlN2RhOTJhMTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMzMjQ5NTEsImV4cCI6MTczMzMyODU1MX0.DX9DPxL3EN-1Ymm-2HkyiIM6HvWy0s_Th2YPjaOYQq8')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"text":"yeaaaaaaaaaaah!"}')