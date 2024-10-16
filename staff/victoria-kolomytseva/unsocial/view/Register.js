/**
 * Constructs Register instances
 */

class Register extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Jeading('Register', 2)
        this.add(title)

        const form = new Form()
        this.add(form)

        form.add(new Label('Name', 'name'))
        const nameInput = new Input('text', 'name')
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

        const submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', event => {
            event.preventDefault()

            var name = nameInput.getValue()
            var email = emailInput.getValue()
            var username = usernameInput.getValue()
            var password = passwordInput.getValue()
            var passwordRepeat = passwordRepeatInput.getValue()

            try {
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                this.removeSelf()

                page.add(login)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })

        const loginLink = new Link('Login')
        this.add(loginLink)

        loginLink.addBehavior('click', event => {
            event.preventDefault()

            this.removeSelf()
            page.add(login)
        })
    }

}