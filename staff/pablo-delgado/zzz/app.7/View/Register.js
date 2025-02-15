// Build Register instances / parts


class Register extends Compo {
    constructor() {
        super(document.createElement("section"))

        const title = new Heading('Register', 2)
        this.add(title)

        const form = new Form()
        this.add(form)

        form.add(new Label('Name', 'name'))
        const nameInput = new Input('text', 'name')
        form.add(nameInput)

        form.add(new Label('E-mail', 'email'))
        const emailInput = new Input('email', 'email')
        form.add(emailInput)

        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        const passwordInput = new PasswordInput('password')
        form.add(passwordInput)

        form.add(new Label('Repeat Password', 'password-repeat'))
        const passwordRepeatInput = new PasswordInput('password', 'password-repeat')
        form.add(passwordRepeatInput)

        const submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', function (event) {
            event.preventDefault()

            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()
            const passwordRepeat = passwordRepeatInput.getValue()

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

        loginLink.addBehavior('click', function (event) {
            event.preventDefault()

            this.removeSelf()

            page.add(login)
        })
    }
}
