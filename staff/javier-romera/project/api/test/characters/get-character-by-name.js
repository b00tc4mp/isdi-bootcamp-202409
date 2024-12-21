const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/characters/Luffy')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjYzk3M2I5ODY1ODM2YjExODJhN2UiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzA4Nzk4MCwiZXhwIjoxNzM0Mjk3NTgwfQ.gNK4SeFwiiuT5BBrpYo5vwfXcgBmOE5T_381eGhCB8c')
xhr.send()

// 200 '{"name":"Monkey D. Luffy","alias":"Luffy","gender":"Male","affiliation":"Straw Hat Pirates","race":"Human","devilFruit":{"type":"Paramecia"},"bounty":3000000000,"height":174,"firstArc":{"name":"Romance Dawn","number":0},"description":"The captain of the Straw Hat Pirates and one of the most prominent members of the Worst Generation. Luffy is determined to become the Pirate King and find the One Piece. Known for his carefree personality, incredible determination, and the powers of the Gomu Gomu no Mi, Luffy is a powerful and inspiring leader.","armament":true,"conqueror":true,"observation":true,"sea":"East Blue","town":"Foosha Village"}'