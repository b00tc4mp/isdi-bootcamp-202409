const registerUser = (name, email, username, password, passwordRepeat) => {
    //Validamos el que nombre no sea inferior a 2 carácteres
    if (name.length < 2) {
        throw new Error('Field name too short, min 3 chars')
    }

    //Validamos el email (que incluya al menos una '@ 'y un '.')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    //Busco si el usuario ya existe
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')


    let user = users.find(user => user.username === username || user.email === email)

    /*let user = users.find(function (user) {
        return user.username === username || user.email === email
    })*/

    //Validamos el password
    if (password !== passwordRepeat) {
        throw new Error('Passwords not match')
    }

    if (user) {
        throw new Error('The user ' + username + ' already exist in the database')
    }

    let newUser = { name: name, email: email, username: username, password: password }
    users.push(newUser)
}