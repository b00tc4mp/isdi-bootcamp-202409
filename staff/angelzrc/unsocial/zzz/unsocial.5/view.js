function buildFormField(id, text, type) {
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id

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

            form.container.reset()

            compo.container.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    })

    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    compo.container.appendChild(registerLink)

    registerLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.container.remove()

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

    var form = document.createElement('form')
    compo.container.appendChild(form)

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
    form.container.appendChild(submitButton)

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

            section.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    section.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()
        body.add(loginSection)
    })

    return compo
}

function buildHomeSection() {
    var compo = new Compo(document.createElement('section'))

    

    var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    compo.container.appendChild(logoutButton)

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.container.remove()

        body.add(loginSection)
    })

    return compo
}