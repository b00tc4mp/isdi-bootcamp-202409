const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/stage')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2FmMzFmM2M5MzhmZDAzYjhhYTVlMWEiLCJpYXQiOjE3Mzk1MzY2MDcsImV4cCI6MTczOTU0MDIwN30.KwTMmM9rO61DWKv87YsAYHFyhyg33ZOJ7qsE9XV2iYo')
xhr.send()