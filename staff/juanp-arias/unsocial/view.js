//function de login
function buildLoginSection() {
    var compo = new Compo(document.createElement('section'))

    var title = new Heading('LOGIN', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('Password', 'password')
    form.add(passwordInput)

    var submitButton = new Button('Login', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.remove()

            //SECCIÓN HOME
            var homeSection = buildHomeSection()

            body.add(homeSection)

        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })

    //CREACIÓN LINK TIPO ANCHOR QUE TE LLEVA A LA SECCIÓN DE REGISTRO
    var registerLink = new Link('Register')
    compo.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        //SECCIÓN DE REGISTRO
        var registerSection = buildRegisterSection()

        body.add(registerSection)
    })
    return compo
}

//function de register
function buildRegisterSection() {
    var compo = new Compo(document.createElement('section'))


    var title = new Heading('REGISTER', 2)
    compo.add(title)

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

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var repeatpassword = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, repeatpassword)

            form.reset()
            compo.remove()
            body.add(loginSection)

        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    })

    var loginLink = new Link('Login')
    compo.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()
        body.add(loginSection)
    })
    return compo
}

//function de home
function buildHomeSection() {
    var compo = new Compo(document.createElement('section'))

    var title = new Heading('HOME', 2)
    compo.add(title)

    var welcome = new Heading('Welcome, ' + loggedInUser.name + '!')
    compo.add(welcome)

    var logout = new Button('Logout', 'button')
    compo.add(logout)

    logout.addBehavior('click', function (event) {
        event.preventDefault()
        loggedInUser = null
        compo.remove()
        body.add(loginSection)
    })
    return compo
}