/**
 * Constructs Login instances Personal
 */
class Login extends Compo {
    constructor() {
        super(document.createElement('section'))
        const title = new Heading('Login', 2)
        this.add(title)

        var form = new Form()
        this.add(form)

        form.add(new Label('Username', 'username'))
        var usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        var passwordInput = new PasswordInput('password')
        form.add(passwordInput)

        var submitButton = new Button('Login', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', event => {
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
                passwordInput.children[0].setValue('')

                alert(error.message)

                console.error(error)
            }
        })

        var registerLink = new Link('Register')
        this.add(registerLink)

        registerLink.addBehavior('click', event => {

            event.preventDefault()

            this.removeSelf()

            var register = new Register()

            page.add(register)

        })
    }
}
