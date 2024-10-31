/**
 * Constructs Login instances
 */
function Login() {
    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Login', 2)
    self.add(title)

    var form = new Form()
    self.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
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

            self.remove()

            var home = new Home()

            page.add(home)
        } catch (error) {
            //passwordInput.container.value = ''
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })


    var registerLink = new Link('Register')
    self.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()

        var register = new Register()

        page.add(register)
    })
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

/**
 * Constructs Register instances
 */
function Register() {
    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Register', 2)
    self.add(title)

    var form = new Form()
    self.add(form)

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
        var passwordRepeat = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            self.remove()

            page.add(login)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var loginLink = new Link('Login')
    self.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()
        page.add(login)
    })
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

/**
 * Constructs Home instances
 */
function Home() {
    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Home', 2)
    self.add(title)

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
    self.add(userTitle)

    var logoutButton = new Button('Logout', 'button')
    self.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        self.remove()

        page.add(login)
    })
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home