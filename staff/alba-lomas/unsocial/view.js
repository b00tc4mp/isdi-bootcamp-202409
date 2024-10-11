


function buildFormField(id, text, type) { // Creamos la funcion con los parametros para el label y el input.
    var label = document.createElement('label') // creamos la varibale label
    label.htmlFor = id // le añadimos el html al id.
    label.innerText = text // y le ponemos texto al innertext.

    var input = document.createElement('input') // creamos la variable input.
    input.type = type
    input.id = id

    return [label, input] // label posicion [0], input posicion [1].
}


function buildButton(text, type) {
    var button = document.createElement('button')
    button.type = type
    button.innerText = text

    return button
}





function buildLoginSection() { // Le creamos una funcion a la presentación del login.
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Login'
    section.appendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)



    var usernameField = buildFormField('username', 'Userame', 'text')
    form.appendChild(usernameField[0]) // [0] en el array es el label.
    form.appendChild(usernameField[1]) // [1] en el array es el input.


    var passwordField = buildFormField('name', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])



    var submitButton = buildButton('Login', 'submit') // le decimos que la variable submitButton es igual a la funcion buildButton y le pasamos el texto (login) y el tipo (submit).
    form.appendChild(submitButton)



    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value // le decimos que la variable username es igual a el contenido de la posicion 1 de la variable usernameField (el input).
        var password = passwordField[1].value // lo mismo que la de arriba pero con password.

        try { // si la funcion authenticateUser funciona, sigue el try.
            loggedInUser = authenticateUser(username, password)

            form.reset()

            section.remove()

            var homeSection = buildHomeSection()

            body.appendChild(homeSection)
        } catch (error) { // si el try no està bien lanzamos un error.
            passwordField[1].value = ''

            alert(error.message) // y nos muestra el error.

            console.log.error(error) // ponemos el console para que muestre en la consola donde esta el error.
        }
    })


    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'

    section.appendChild(registerLink)


    registerLink.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()

        var registerSection = buildRegisterSection() // le decimos que register seccion es igual a buildRegisterSection.

        body.appendChild(registerSection)
    })
    return section
}






function buildRegisterSection() { // Creamos la funcion del Register.
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Register'
    section.appendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)




    var nameField = buildFormField('name', 'Name', 'text')
    form.appendChild(nameField[0])
    form.appendChild(nameField[1])


    var emailField = buildFormField('name', 'E-mail', 'email')
    form.appendChild(emailField[0])
    form.appendChild(emailField[1])


    var usernameField = buildFormField('username', 'Userame', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])


    var passwordField = buildFormField('name', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])


    var passwordRepeatField = buildFormField('password-repeat', 'Repeat password', 'password')
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])




    var submitButton = buildButton('Register', 'submit')
    form.appendChild(submitButton)



    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = nameField[1].value // le decimos que name es igual a la posicion [1] (input) de la variable nameField.
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        /* el try catch no solo captura un error (como el return), tambien hace algo con el. */

        try { // si se cumple lo de abajo sigue.
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            section.remove()

            body.appendChild(loginSection)
        } catch (error) { // si no se cumple de lo arriba se rompe y viene aqui.
            alert(error.message) // y nos muestra el error.

            console.log.error(error)  // ponemos el console para que muestre en la consola donde esta el error.

        }
    })

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    section.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()
        body.appendChild(loginSection)
    })

    return section
}







function buildHomeSection() { // Creamos la funcion de home. 
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Home'
    section.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    section.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    section.appendChild(logoutButton)

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        section.remove()

        body.appendChild(loginSection)
    })

    return section
}