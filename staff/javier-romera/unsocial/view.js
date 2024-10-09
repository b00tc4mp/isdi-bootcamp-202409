function buildFormField(id, text, type) {
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id

    return [label, input]
}

function buildButton(text, type) {
    var button = document.createElement('button')
    button.type = type
    button.innerText = text

    return button
}

function buildAnchor(ref, text) {
    var anchor = document.createElement('a')
    anchor.href = ref
    anchor.innerText = text

    return anchor
}

function buildLoginSection() {
    var compo = new Compo(document.createElement('section'))

    var section = compo.container

    var title = document.createElement('h2') // Título Login
    title.innerText = 'Login'
    section.appendChild(title)

    var form = document.createElement('form') // El formulario del login
    section.appendChild(form)

    var usernameField = buildFormField('username', 'Userame', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit') // El botón de login
    form.appendChild(submitButton)

    form.addEventListener('submit', function (event) { // Botón login (borramos login y montamos home)
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = authenticateUser(username, password) // Llamamos a la función para confirmar que el usuario existe

            form.reset() // Borramos el form del login (porque salimos de login)

            section.remove() // Borramos el login

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = ""

            console.error(error)

            alert(error.message)
        }
    })

    var registerLink = buildAnchor('', 'Register')
    section.appendChild(registerLink)

    registerLink.addEventListener('click', function (event) { // Borramos login y vamos a la pantalla de registro
        event.preventDefault()

        form.reset() // Borramos el contenido que hubiese escrito en el formulario del login

        section.remove() // Desmontamos login

        var registerSection = buildRegisterSection()

        body.add(registerSection) // Montamos el registro
    })

    return compo
}

function buildRegisterSection() {
    var compo = new Compo(document.createElement('section'))

    var section = compo.container

    var title = document.createElement('h2') // Título de registro
    title.innerText = "Register"
    section.appendChild(title)

    var form = document.createElement('form') // Creación del formulario que tendrá los campos para el registro
    section.appendChild(form)

    var nameField = buildFormField('name', 'Name', 'text')
    form.appendChild(nameField[0])
    form.appendChild(nameField[1])

    var emailField = buildFormField('email', 'E-mail', 'email')
    form.appendChild(emailField[0])
    form.appendChild(emailField[1])

    var usernameField = buildFormField('username', 'Username', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var passwordRepeatField = buildFormField('repeatPassword', 'Confirm password', 'password')
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])

    var submitButton = document.createElement('button') // Botón de registro
    submitButton.type = "submit"
    submitButton.innerText = "Register"
    form.appendChild(submitButton)

    form.addEventListener('submit', function (event) { // Acción del botón para registrar al usuario y volver a la pantalla login
        event.preventDefault()

        // Guardar todos los valores
        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var confirmpassword = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, confirmpassword) // Llamamos a la función para registrar al usuario

            form.reset() // Borramos el formulario de registro

            section.remove() // "Salimos" de registro

            body.add(loginSection) // Montamos el login
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    var loginLink = buildAnchor('', 'Login')
    section.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) { // Borramos registro y montamos login
        event.preventDefault()

        section.remove() // "Salimos" de registro

        form.reset() // Borramos el formulario de registro

        body.add(loginSection) // Montamos el login
    })

    return compo
}

function buildHomeSection() {
    var compo = new Compo(document.createElement('section'))

    var section = compo.container

    var title = document.createElement('h2') // Título de home
    title.innerText = "Home"
    section.appendChild(title)

    var welcome = document.createElement('h3') // Texto de bienvenida
    welcome.innerText = "Welcome, " + loggedInUser.name + "!"
    section.appendChild(welcome)

    var logoutButton = buildButton('Logout', 'button')
    section.appendChild(logoutButton)

    logoutButton.addEventListener("click", function (event) { // Acción del botón de logout (dentro de home)
        event.preventDefault()

        loggedInUser = null // Desconectamos al usuario

        section.remove() // Desmontamos home

        body.add(loginSection) // Volvemos al login
    })

    return compo
}