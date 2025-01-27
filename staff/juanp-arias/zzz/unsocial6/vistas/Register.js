//function de register
class Register extends Compo {
    constructor() {
        super(document.createElement('section'))
        let compo = this
        compo.container.classList.add('section-container')
        let title = new Heading('REGISTER', 2)
        compo.add(title)

        let form = new Form()
        compo.add(form)

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
        let passwordInput = new PasswordInput('password', 'password')
        form.add(passwordInput)

        form.add(new Label('Repeat Password', 'password-repeat'))
        let passwordRepeatInput = new PasswordInput('password', 'password-repeat')
        form.add(passwordRepeatInput)

        let submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', function (event) {
            event.preventDefault()

            let name = nameInput.getValue()
            let email = emailInput.getValue()
            let username = usernameInput.getValue()
            let password = passwordInput.getValue()
            let repeatpassword = passwordRepeatInput.getValue()

            try {
                registerUser(name, email, username, password, repeatpassword)

                form.reset()
                compo.remove()
                page.add(loginSection)

            } catch (error) {

                alert(error.message)
                console.error(error)
            }
        })
        let loginLink = new Link('Login')
        compo.add(loginLink)

        loginLink.addBehavior('click', function (event) {
            event.preventDefault()

            compo.remove()
            page.add(loginSection)
        })
    }
}