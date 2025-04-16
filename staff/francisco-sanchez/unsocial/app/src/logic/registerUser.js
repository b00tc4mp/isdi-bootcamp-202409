//import validate from './helpers/validate.js'
//import { validate } from './helpers'

import { validate, errors } from 'com'

const { SystemError } = errors


//Esto ya no lo usaremos porque calcularemos con el xhr
//import uuid from '../data/uuid.js'

export default (name, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)


    return fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })

}
//Recuperamos los usuarios de la memoria
// 05/11/2024 --> Ya no recuperaremos los usuarios de la memoria
//const users = JSON.parse(localStorage.users)

// 05/11/2024 --> Codigo nuevo que va contra la api
/*   const xhr = new XMLHttpRequest

  xhr.addEventListener('load', () => {
      const { status, response } = xhr

      if (status === 201) {
          callback(null)

          return
      }

      const { error, message } = JSON.parse(response)

      const constructor = errors[error]

      callback(new constructor(message))
  })

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/register`)
  xhr.addEventListener('error', () => callback(new SystemError('server error')))

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat }))
}

*/

// 05/11/2024 -->Codigo antiguo antes de ir con la api!

// let user = users.find(user => user.username === username || user.email === email)


// if (user) {
//     throw new Error('The user ' + username + ' already exist in the database')
// }

// let newUser = {
//     id: uuid(),
//     name: name,
//     email: email,
//     username: username,
//     password: password
// }
// users.push(newUser)

// //Actualizamos el array de usuarios en la memoria
// localStorage.users = JSON.stringify(users)