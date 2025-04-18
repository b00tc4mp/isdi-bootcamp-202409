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
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Login'
    section.appendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)

    var usernameField = buildFormField('username', 'Username', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit')
    form.appendChild(submitButton)

    form.onsubmit = function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = loginUser(username, password)

            form.reset()

            var homeSection = buildHomeSection()

            section.remove()
            body.appendChild(homeSection)
        } catch (error) {
            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    }

    var registerLink = buildAnchor('', 'Register')
    section.appendChild(registerLink)

    registerLink.onclick = function (event) {
        event.preventDefault()

        var registerSection = buildRegisterSection()

        section.remove()
        body.appendChild(registerSection)
    }
    return section
}

function buildRegisterSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Register'
    section.appendChild(title)

    var form = document.createElement('form')
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

    var passwordRepeatField = buildFormField('password-repeat', 'Repeat password', 'password')
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])

    var submitButton = buildButton('Register', 'submit')
    form.appendChild(submitButton)

    form.onsubmit = function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            section.remove()
            body.appendChild(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    var loginLink = buildAnchor('', 'Login')
    section.appendChild(loginLink)

    loginLink.onclick = function (event) {
        event.preventDefault()

        section.remove()
        body.appendChild(loginSection)
    }
    return section
}

function buildHomeSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Home'
    section.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello ' + loggedInUser.name + '!'
    section.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    section.appendChild(logoutButton)

    logoutButton.onclick = function (event) {
        event.preventDefault()

        loggedInUser = null

        section.remove()
        body.appendChild(loginSection)
    }
    return section
}