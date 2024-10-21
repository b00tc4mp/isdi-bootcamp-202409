const registerUser = (name, email, username, password, passwordRepeat) => {
    //Validamos el que nombre no sea inferior a 2 carácteres
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2) {
        throw new Error('Field name too short, min 3 chars')
    }

    //Validamos el email (que incluya al menos una '@ 'y un '.')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    //Busco si el usuario ya existe
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (typeof password !== 'string') throw new Error('invalid username')
    if (password.length < 4)
        throw new Error('invalid password')

    if (typeof password !== 'string') throw new Error('invalid username')
    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    //Validamos el password
    if (password !== passwordRepeat) {
        throw new Error('Passwords not match')
    }

    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)


    if (user) {
        throw new Error('The user ' + username + ' already exist in the database')
    }

    let newUser = {
        id: uuid(),
        name: name,
        email: email,
        username: username,
        password: password
    }
    users.push(newUser)

    //Actualizamos el array de usuarios en la memoria
    localStorage.users = JSON.stringify(users)
}