const registerUser = (name, email, username, password, passwordRepeat) => {
    if (name.length < 2) //minimo 2 caracteres para el nombre
        throw new Error('invalid name')

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail') //tiene que coincidir con todas las reglas de la expresión regular

    if (username.length < 4 || username.length > 12) // si username tiene menos de 4 o mas de 12, no lo permitirá
        throw new Error('invalid username')

    if (password.length < 8) // la contraseña no puede tener menos de 8 caracteres
        throw new Error('invalid password. Min. 8 characters')

    if (password !== passwordRepeat) // verifica que ambas contraseñas sean iguales
        throw new Error('passwords do not match, babes')

    var user = users.find(function (user) {
        return user.username === username || user.email === email //verifica que el usuario y contraseña sean correctas
    })

    if (user !== undefined) //  !== : es distinto tal de cual? (tipo y valor)
        throw new Error('meek! user already exists, check it out and try again')

    user = { name: name, email: email, username: username, password: password }

    users.push(user)
}