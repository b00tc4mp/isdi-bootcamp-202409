function buildFormField(id, text, type) {
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id
    input.required = true

    return [label, input]
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

function buildLoginSection() {

    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit')
    form.add(submitButton)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    })

    var anchorText = document.createElement('p')
    anchorText.innerText = "Don't have an account? "
    compo.container.appendChild(anchorText)

    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    anchorText.appendChild(registerLink)

    registerLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.remove()

        var registerSection = buildRegisterSection()

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

    var repeatPasswordField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.container.appendChild(repeatPasswordField[0])
    form.container.appendChild(repeatPasswordField[1])

    var submitButton = buildButton('Register', 'submit')
    form.container.appendChild(submitButton.container)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = repeatPasswordField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            compo.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var anchorText = document.createElement('p')
    anchorText.innerText = 'Already have an account? '
    compo.container.appendChild(anchorText)

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    anchorText.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.remove()
        body.add(loginSection)
    })
    return compo
}

function buildHomeSection() {

    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title)

    var greeting = document.createElement('h3')
    greeting.innerText = "Hey " + loggedInUser.name + ", you're finally awake!"
    compo.container.appendChild(greeting)

    var logoutButton = buildButton('Logout', 'button')
    compo.add(logoutButton)

    logoutButton.container.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.remove()

        body.add(loginSection)
    })

    return compo
}