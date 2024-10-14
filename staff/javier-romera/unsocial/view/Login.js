/**
 * Constructs Login instances
 */
function Login() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Login', 2)
    this.add(title)

    var form = new Form()
    this.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    var submitButton = new Button('submit', 'Login')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            this.removeSelf()

            home = new Home()

            page.add(home)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    }.bind(this))

    var registerLink = new Link('Register')
    this.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        form.reset()

        this.removeSelf()

        var register = new Register()

        page.add(register)
    }.bind(this))
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login