const registerUser = (name, email, username, password, passwordRepeat) => {
    if (name.length < 2) //Verificar si el nombre es válido
        throw new Error('invalid name')

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')//Verificar si el correo electrónico es válido

    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    let user = undefined;
    let users = []
    if (localStorage.users) {
        users = JSON.parse(localStorage.users)//Obtener usuarios del localStorage

        user = users.find(user => user.username === username || user.email === email) //Verificación de existencia de usuario
    }


    if (user !== undefined) //Si el usuario ya existe (es decir, si user no es undefined), lanza un error con el mensaje 'user already exists'
        throw new Error('user already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password } //Creación del nuevo usuario

    users.push(user) // Finalmente, el nuevo usuario se agrega a la lista de users utilizando el método .push(), que añade el nuevo usuario al final del arreglo.

    localStorage.users = JSON.stringify(users)//Guardar los usuarios actualizados en localStorage
}

