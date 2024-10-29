


// Es donde se ponen las reglas.)


// funcion del registro
function registerUser(name, email, username, password, passwordRepeat) {
    if (name.length < 2) // Creamos una regla para el nombre que se quiere registrar.
        throw new Error('invalid name') // al utilizar el throw, rompe el cogido y ya no es necesario poner el return.


    /* Se pueden utilizar regex ya hechas para poner reglas*/
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) // regla para registrar un email, esto es un regex.
        throw new Error('invalid e-mail')


    if (username.length < 4 || username.length > 12) // regla para username
        throw new Error('invalid username')


    if (password.length < 8)  // regla para password.
        throw new Error('invalid password')


    if (password !== passwordRepeat)
        throw new Error('password do not match')


    /* si se encuentra en el array un usuario o un correo con el mismo nombre
    user seria undefined, no se podria crear el usuario.
    */
    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined) // si user es indefinido.
        throw new Error('user already exists') // alertar


    var user = { name: name, email: email, username: username, password: password }

    users.push(user)
}



// funcion del login
function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    var user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('wrong credentials')

    return user
}