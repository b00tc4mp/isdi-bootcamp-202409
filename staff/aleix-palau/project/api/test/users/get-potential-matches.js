const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/potential-matches?page=1&limit=10')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UyZWZhMDgwY2FiOTNjMDIzMDhhODEiLCJpYXQiOjE3NDI5MjU3MzksImV4cCI6MTc0Mjk2ODkzOX0.BL23R44OcsL9g87tgrqcCuBKS_s9e6Bu6Bp90GRYjyk')
xhr.send()