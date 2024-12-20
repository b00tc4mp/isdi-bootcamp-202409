const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Peter Parker", "email":"pparker@db.com","username":"pparker","password":"123456789", "password2":"123456789"}')


async function createUser() {
    const url = 'http://localhost:8080/users'
    const data = {
        name: "Ben Reily",
        email: "breily@gmail.com",
        username: "breily",
        password: "123456789",
        password2: "123456789"
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        console.log(response.status, await response.json())
    } catch (error) {
        console.error('Error:', error)
    }

}

createUser()


/*

async function createUser() {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Peter Parker",
                email: "pparker@db.com",
                username: "pparker",
                password: "123123123",
                password2: "123123123"
            })
        });

        console.log(response.status);
        
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('Error:', error); 
    }
}
createUser();

*/