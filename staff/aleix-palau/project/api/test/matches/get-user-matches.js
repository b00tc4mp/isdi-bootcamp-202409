const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/matches')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODQ3MDM3ZmE4N2Y5ZWRjZTE1ZGVmMDYiLCJpYXQiOjE3NDk1NTUxNTQsImV4cCI6MTc0OTU5ODM1NH0.LaaKbfdhU80B7nxmxlQoWGuMhWTpd8Jqq_V8jI-H5sA')
xhr.send()