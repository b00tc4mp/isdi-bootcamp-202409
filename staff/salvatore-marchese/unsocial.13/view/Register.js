/**
 * Constructs Register instances
 */
class Register extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Register', 2)
        this.add(title)

        const form = new Form()
        this.add(form)

        form.add(new Label('Name', 'name'))
        const nameInput = new Input('text', 'name', 'i.e. Tom')
        form.add(nameInput)

        form.add(new Label('E-mail', 'email'))
        const emailInput = new Input('email', 'email', 'i.e. unsocial@gmail.com')
        form.add(emailInput)

        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('text', 'username', 'i.e. hacker')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        const passwordInput = new PasswordInput('password')
        form.add(passwordInput)

        form.add(new Label('Repeat Password', 'password-repeat'))
        const passwordRepeatInput = new PasswordInput('password-repeat')
        form.add(passwordRepeatInput)

        const submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', event => {
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

        loginLink.addBehavior('click', event => {
            event.preventDefault()

            this.removeSelf()
            page.add(login)
        })
    }  
}