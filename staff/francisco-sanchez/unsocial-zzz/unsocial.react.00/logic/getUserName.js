//Esta función nos muestra el nombre que da la bienvenida al usuario tras el login
const getUserName = userId => {
    if (typeof userId !== 'string') throw new Error('Wrong userId')

    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)
    console.log("Sesion en la carga en la getUserName: " + sessionStorage.loggedInUserId)

    const user = users.find(user => user.id === userId)

    if (!user) throw new Error('user not found')

    return user.name
}

//Esta función nos devuelve el username que se muestra en los posts
const getUserUserName = userId => {
    if (typeof userId !== 'string') throw new Error('Wrong userId')

    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === userId)

    if (!user) throw new Error('user not found')

    return user.username
}