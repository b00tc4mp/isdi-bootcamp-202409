function buildLoginSection() {
    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = new Form()
    compo.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    var submitButton = new Button('Login', 'submit')
    form.add(submitButton)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {
            //passwordInput.container.value = ''
            passwordInput.setValue('')

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

    var form = new Form()
    compo.add(form)

    form.add(new Label('Name', 'name'))
    var nameInput = new Input('text', 'name')
    form.add(nameInput)

    form.add(new Label('E-mail', 'email'))
    var emailInput = new Input('email', 'email')
    form.add(emailInput)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new Input('password', 'password-repeat')
    form.add(passwordRepeatInput)

    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        //var name = form.container.name.value
        //var name = event.target.name.value
        //var name = this.name.value
        //var name = nameInput.container.value
        var name = nameInput.getValue()
        //var email = this.email.value
        //var email = emailInput.container.value
        var email = emailInput.getValue()
        //var username = this.username.value
        //var username = usernameInput.container.value
        var username = usernameInput.getValue()
        //var password = this.password.value
        //var password = passwordInput.container.value
        var password = passwordInput.getValue()
        //var passwordRepeat = this['password-repeat'].value
        //var passwordRepeat = passwordRepeatInput.container.value
        var passwordRepeat = passwordRepeatInput.getValue()

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

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    compo.container.appendChild(loginLink)

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

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(userTitle)

    var logoutButton = new Button('Logout', 'button')
    compo.add(logoutButton)

    logoutButton.container.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.remove()

        body.add(loginSection)
    })

    return compo
}