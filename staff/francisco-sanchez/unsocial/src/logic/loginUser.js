import validate from "./helpers/validate"

export default (username, password) => {

    validate.username(username)
    validate.password(password)

    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)

    /*let user = users.find(function (user) {
        return user.username === username && user.password === password
    })*/

    if (user === undefined)
        throw new Error('User or password are not valid')

    //return user.id
    sessionStorage.userId = user.id
}

