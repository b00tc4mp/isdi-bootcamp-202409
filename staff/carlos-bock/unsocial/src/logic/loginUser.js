import {validate} from './helpers'

const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)
    
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('wrong credentials')

    sessionStorage.userId = user.id
}

export default loginUser