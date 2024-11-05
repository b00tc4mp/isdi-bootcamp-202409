export default callback => {

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        const { status, response } = xhr

        if (status === 200) {

            const name = JSON.parse(response)
            callback(null, name)
            return
        }

        const { error, message } = JSON.parse(response)

        callback(new Error(message))
    })

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)

    /* const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    return user.name */
}
