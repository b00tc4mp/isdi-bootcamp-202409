function registerUser(name, email, username, password, passwordRepeat) {
    //CONDICIONALES PARA EL REGISTER
    //----- MÍNIMO DE LETRAS PARA EL NAME -----
    if (name.length < 2)
        throw new Error('Name too short')

    //----- RegExp PARA EL EMAIL -----
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('Invalid e-mail')

    //----- MÍNIMO Y MÁXIMO DE LETRAS PARA EL USERNAME -----
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    //----- MÍNIMO DE LETRAS LA PASSWORD -----
    if (password.length < 2)
        throw new Error('Password too short')

    //CHECK PARA QUE LA CONTRASEÑA COINCIDA CON EL REPEAT
    if (passwordRepeat !== password) {
        password.value = ''
        passwordRepeat.value = ''
        throw new Error('Password does not match!')
    }

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined) {
        if (user.username === username)
            throw new Error('Username already exists')

        if (user.email === email)
            throw new Error('Email already exists')
    }

    user = { name: name, email: email, username: username, password: password }

    users.push(user)
}


function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    var user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('Wrong credentials')

    return user
}