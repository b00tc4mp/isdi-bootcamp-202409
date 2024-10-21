/**
 * Constructs Register instances
 */
class Register extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Register', 2)
        this.add(title)

        const form = new Form
        this.add(form)

        form.add(new Label('Name', 'name'))
        const nameInput = new Input('text', 'name')
        form.add(nameInput)

        form.add(new Label('E-mail', 'email'))
        const emailInput = new Input('email', 'email')
        form.add(emailInput)

        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('username', 'text')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        const passwordInput = new Input('password', 'password')
        form.add(passwordInput)

        form.add(new Label('Confirm Password', 'repeatPassword'))
        const passwordRepeatInput = new Input('repeatPassword', 'password')
        form.add(passwordRepeatInput)

        const submitButton = new Button('submit', 'Register')
        form.add(submitButton)

        form.addBehavior('submit', event => {
            event.preventDefault()

            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()
            const confirmpassword = passwordRepeatInput.getValue()

            try {
                registerUser(name, email, username, password, confirmpassword) // Registramos al usuario (logic.js)

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