const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/m2x99dua3tc/name')
xhr.setRequestHeader('Authorization', 'm2w6ch7dkh')
xhr.send()