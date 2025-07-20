const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users/anonymous')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()

// 200 '{"name":"m4643k2m1i","email":"m4643k2m1i@gmail.com","username":"m4643k2m1i","password":"$2a$04$xUsbQyE7OjVxejW3aslNoOwsTYrosQoPMlGAcgVVhGpsWHs5vdhcq","role":"anonymous","score":0,"rank":"Rookie","_id":"674cd4a408f9b2567f1e1df6"}'