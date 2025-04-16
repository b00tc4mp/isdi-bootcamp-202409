import { errors } from 'com'

const { NotFoundError } = errors

export default () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new NotFoundError('user not found')

    return user
}

