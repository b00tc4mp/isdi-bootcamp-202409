const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/characters/names/Romance-Dawn')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVhMDhmZmVjNDA3YzNlODVhZmYwNGMiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzk1NTI4NCwiZXhwIjoxNzM1MTY0ODg0fQ.5mrbcm9cgYp66yjKUWpV5YD_0Oj_AjaGmSacr3NPCVs')
xhr.send()