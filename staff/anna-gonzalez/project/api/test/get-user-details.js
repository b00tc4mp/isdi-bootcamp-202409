const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/674c4f12f8e6789144c5d1a9/details')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzMwNTQyMzUsImV4cCI6MTczMzA1NzgzNX0.xXkaoK_2zMfrtkD5MJIwqB0ZKuVKVk3Ck7_lP9YQ_Zk')
xhr.send()

// 200 '{"name":"Anna","email":"an@na.com","password":"$2a$10$GpSl0vlyvDb8ITWYwLya7O.ESmaBkzRk4mN2syKm8doUPcYRFtPx2"}'