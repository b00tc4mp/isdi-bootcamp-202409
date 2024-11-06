import { validate } from 'com'

export default (name, email, username, password, passwordRepeat, callback) => { //añadimos callback para avisar q ha ido bien, ya q no puede ser un return
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => { //esto es asincronía
        const { status, response } = xhr

        if (status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(response)

        callback(new Error(message))
    })

    xhr.open('POST', 'http://localhost:8080/register') //esto es indispensable
    xhr.setRequestHeader('Content-Type', 'application/json') //solo si hay body. También podría ser authorization si hay un user loggeado
    xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat })) //vacío si no enviamos data
}