const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/users/67602e894f4ea51a4e9e79e1')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzYwMmU4OTRmNGVhNTFhNGU5ZTc5ZTEiLCJpYXQiOjE3MzQzNTgyMTUsImV4cCI6MTczNDM2MTgxNX0.vYX58URZ0PLnnt6bdVv0PJu_oxp3uVIFPpYHoZiILOs')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"gender":"Man","targetGender":["Women"]}')