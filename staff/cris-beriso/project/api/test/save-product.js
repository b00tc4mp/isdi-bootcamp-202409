const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/products/6752de794b7e1a2a93d08179/save')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUyZGU3ODRiN2UxYTJhOTNkMDgxNDkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM0OTMzNTUsImV4cCI6MTczMzQ5Njk1NX0.zQPJpxfqdeMMGQMH2dCvnX0_poRskbNA9LEX94Ozzv4')
xhr.send()