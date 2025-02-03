import { errors } from 'com'

const { SystemError } = errors

export default () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new SystemError('user not found')

    return user
}

