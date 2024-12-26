const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/products/6751868cab8f3e047ae9554b/likes')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUxODY4YmFiOGYzZTA0N2FlOTU1MTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM0MTMxNjQsImV4cCI6MTczMzQxNjc2NH0.r-BoB63H9u0cnzw26ifbIR9u_Yw48GP-4u8XTQURcBk')
xhr.send()
