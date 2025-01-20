class Login extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Login', 2)
        this.add(title)

        const form = new Form()
        this.add(form)

        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        const passwordInput = new PasswordInput('password', 'password')
        form.add(passwordInput)

        const submitButton = new Button('Login', 'submit')
        form.add(submitButton)

        form.addBehaviour('submit', event => {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                loggedInUser = loginUser(username, password)

                form.reset()

                this.removeSelf()

                home = new Home()

                page.add(home)
            } catch (error) {
                passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }
        })

        const registerLink = new Link('Register')
        this.add(registerLink)

        registerLink.addBehaviour('click', event => {
            event.preventDefault()

            form.reset()

            this.removeSelf()

            const register = new Register()

            page.add(register)
        })
    }
}