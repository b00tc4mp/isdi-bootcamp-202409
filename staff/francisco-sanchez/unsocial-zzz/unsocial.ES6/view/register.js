/**
 * Constructs Register instances
 */

class Register extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Register', 2)
        this.add(title)

        let form = new Form()
        this.add(form)

        form.add(new Label('Name', 'name'))
        let nameInput = new Input('text', 'name')
        form.add(nameInput)

        form.add(new Label('E-mail', 'email'))
        let emailInput = new Input('email', 'email')
        form.add(emailInput)

        form.add(new Label('Username', 'username'))
        let usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        let passwordInput = new PasswordInput('password')
        form.add(passwordInput)

        form.add(new Label('Repeat Password', 'password-repeat'))
        let passwordRepeatInput = new PasswordInput('password-repeat')
        form.add(passwordRepeatInput)

        let submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', event => {
            event.preventDefault()

            let name = nameInput.getValue()
            let email = emailInput.getValue()
            let username = usernameInput.getValue()
            let password = passwordInput.getValue()
            let passwordRepeat = passwordRepeatInput.getValue()

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

        let loginLink = new Link('Login')
        this.add(loginLink)

        loginLink.addBehavior('click', event => {
            event.preventDefault()

            this.removeSelf()
            page.add(login)
        })
    }
}