const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/spotify/auth-url')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODQyOWYyZmYwMWZmMDJhYWI3MGYwZDQiLCJpYXQiOjE3NDk1NzEyNjksImV4cCI6MTc0OTYxNDQ2OX0.mh1tJhELXJZlRLAmGVwWQx3hIDYlrgb556SYR2HBLNg')
xhr.send()
// needs &state={userId} to complete URL