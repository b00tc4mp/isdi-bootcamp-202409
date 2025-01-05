const authenticateUser = (username, password) => {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    console.log(localStorage)
    const users = JSON.parse(localStorage.users) //Convierte la cadena de texto que está almacenada en localStorage.users en un objeto o un arreglo de objetos de JavaScript para a poder usarlo y manipularlo en nuestro código

    const user = users.find(user => user.username === username && user.password === password)


    if (user === undefined)
        throw new Error('wrong credentials')

    return user.id
}