/**
 * Construcs Register instances
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
    var passwordInput = new PasswordInput('password')
    form.add(passwordInput)

    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new PasswordInput('password-repeat')
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

    var anchorText = new Paragraph('Already have an account? ')
    self.add(anchorText)

    var loginLink = new Link('Login')
    anchorText.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()
        page.add(login)
    })
}

Register.extends(Compo)