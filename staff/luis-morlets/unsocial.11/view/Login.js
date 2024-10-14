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
    var passwordInput = new PasswordInput('password')
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

            home = new Home()

            page.add(home)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })

    var anchorText = new Paragraph("Don't have an account? ")
    self.add(anchorText)

    var registerLink = new Link('Register')
    anchorText.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()

        var register = new Register()

        page.add(register)
    })
}

Login.extends(Compo)