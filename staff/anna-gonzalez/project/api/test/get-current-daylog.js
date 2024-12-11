const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/cycles/daylog/2024-12-02')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzM4NDI3MDMsImV4cCI6MTczNjQzNDcwM30.WKEEz_eRQPAV_RUp3i4NGhRnAy1qJ1fvJaZl-AwrM6M')
xhr.send()

//200 '{"date":"2024-12-06T00:00:00.000Z","symptoms":["dryness"],"id":"6759558ba0ee64943190474b"}'