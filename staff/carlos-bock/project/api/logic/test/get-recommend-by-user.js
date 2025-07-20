const userId = '6754a8149c175644a60dad82'

const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    console.log('Status:', xhr.status)
    console.log('Response:', JSON.parse(xhr.response))
});

xhr.addEventListener('error', () => {
    console.error('An error occurred during the request.')
});

xhr.open('GET', `http://localhost:8080/recommends/user/${userId}`)
xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
xhr.send();
