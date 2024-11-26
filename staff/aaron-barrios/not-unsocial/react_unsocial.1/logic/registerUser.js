const registerUser = (name, email, username, password, passwordRepeat) => {
    //CONDICIONALES PARA EL REGISTER
    //----- MÍNIMO DE LETRAS PARA EL NAME -----
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2)
        throw new Error('Name too short')

    //----- RegExp PARA EL EMAIL -----
    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('Invalid e-mail')

    //----- MÍNIMO Y MÁXIMO DE LETRAS PARA EL USERNAME -----
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    //----- MÍNIMO DE LETRAS LA PASSWORD -----
    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 2)
        throw new Error('Password too short')

    //CHECK PARA QUE LA CONTRASEÑA COINCIDA CON EL REPEAT
    if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat')
    if (passwordRepeat !== password) {
        password.value = ''
        passwordRepeat.value = ''
        throw new Error('Password does not match!')
    }

    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined) {
        if (user.username === username)
            throw new Error('Username already exists')

        if (user.email === email)
            throw new Error('Email already exists')
    }

    user = { name: name, email: email, username: username, password: password }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}