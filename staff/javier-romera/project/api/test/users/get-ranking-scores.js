const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/scores/0')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVkNzE1Y2ZjZTZkYTViNTAxMWNmZmUiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDE3NzEyNSwiZXhwIjoxNzM1Mzg2NzI1fQ.zXK2McfcGT4RRzVLNKFxgr2VSI7koMnRv9TCMiYtSKo')
xhr.send()