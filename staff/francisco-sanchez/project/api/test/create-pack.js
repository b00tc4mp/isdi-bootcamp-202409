const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/packs/create-pack')
xhr.setRequestHeader('Authorization', 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwMzZjMDEwNDczZjNkODA5ZTUzNTkiLCJyb2xlIjoic3RhbmRhcmQiLCJpYXQiOjE3MzMzMTE5MTQsImV4cCI6MTczMzM0MDcxNH0.Ju0jNbbe5TCRULxhlAX2x2YhagjAqwuGI3XQnx28swk')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"user":"674f1fc3a728c03cdd10ba3c","packName":"5h pack", "description": "description for 5h pack", "quantity": "5", "unit": "units", "expiringTime": "12", "price": "60", "currency": "EUR"  }')