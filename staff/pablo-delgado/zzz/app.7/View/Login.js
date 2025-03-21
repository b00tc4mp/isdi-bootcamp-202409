//* construct Login instances / parts


class Login extends Compo {
    constructor() {
        super(document.createElement('section'))
        var compo = this
        const title = new Heading('Login', 2)
        compo.add(title)

        const form = new Form()
        compo.add(form)

        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        const passwordInput = new PasswordInput('password', 'password')
        form.add(passwordInput)

        const submitButton = new Button('Login', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', function (event) {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                loggedInUser = authenticateUser(username, password)

                form.reset()

                compo.removeSelf()

                home = new Home()

                page.add(home)
            } catch (error) {
                passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }

        })

        const registerLink = new Link('Register')
        compo.add(registerLink)

        registerLink.addBehavior('click', function (event) {
            event.preventDefault()

            compo.removeSelf()

            const register = new Register()

            page.add(register)
        })
    }
}
