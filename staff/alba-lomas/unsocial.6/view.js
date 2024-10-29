


function buildFormField(id, text, type) { // Creamos la funcion con los parametros para el label y el input.
    var label = document.createElement('label') // creamos la varibale label
    label.htmlFor = id // le añadimos el html al id.
    label.innerText = text // y le ponemos texto al innertext.

    var input = document.createElement('input') // creamos la variable input.
    input.type = type
    input.id = id

    return [label, input] // label posicion [0], input posicion [1].
}

function buildForm() {
    var compo = new Compo(document.createElement('form'))

    return compo

}


function buildButton(text, type) {
    var compo = new Compo(document.createElement('button'))

    compo.container.type = type
    compo.container.innerText = text

    return compo
}







function buildLoginSection() { // Le creamos una funcion a la presentación del login.
    var compo = new Compo(document.createElement('section'))


    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)



    var usernameField = buildFormField('username', 'Userame', 'text')
    form.container.appendChild(usernameField[0]) // [0] en el array es el label.
    form.container.appendChild(usernameField[1]) // [1] en el array es el input.


    var passwordField = buildFormField('name', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])



    var submitButton = buildButton('Login', 'submit') // le decimos que la variable submitButton es igual a la funcion buildButton y le pasamos el texto (login) y el tipo (submit).
    form.add(submitButton)



    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value // le decimos que la variable username es igual a el contenido de la posicion 1 de la variable usernameField (el input).
        var password = passwordField[1].value // lo mismo que la de arriba pero con password.

        try { // si la funcion authenticateUser funciona, sigue el try.
            loggedInUser = authenticateUser(username, password)

            form.container.reset()

            compo.container.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) { // si el try no està bien lanzamos un error.
            passwordField[1].value = ''

            alert(error.message) // y nos muestra el error.

            console.error(error) // ponemos el console para que muestre en la consola donde esta el error.
        }
    })





    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'

    compo.container.appendChild(registerLink)


    registerLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.container.remove()

        var registerSection = buildRegisterSection() // le decimos que register seccion es igual a buildRegisterSection.

        body.add(registerSection)
    })
    return compo
}




function buildRegisterSection() {
    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Register'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    var nameField = buildFormField('name', 'Name', 'text')
    form.container.appendChild(nameField[0])
    form.container.appendChild(nameField[1])

    var emailField = buildFormField('email', 'E-mail', 'email')
    form.container.appendChild(emailField[0])
    form.container.appendChild(emailField[1])

    var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.container.appendChild(passwordRepeatField[0])
    form.container.appendChild(passwordRepeatField[1])

    var submitButton = buildButton('Register', 'submit')
    form.container.appendChild(submitButton.container)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.container.reset()

            compo.container.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    compo.container.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.container.remove()
        body.add(loginSection)
    })

    return compo
}





function buildHomeSection() { // Creamos la funcion de home. 
    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    compo.add(logoutButton)

    logoutButton.container.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.container.remove()

        body.add(loginSection)
    })

    return compo
}