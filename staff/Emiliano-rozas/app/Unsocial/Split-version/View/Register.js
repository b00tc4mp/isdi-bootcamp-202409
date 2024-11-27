class Register extends Compo {
    constructor() {
        //Register section
        super(document.createElement('section'))

        const title = new Heading('Register', 2)
        this.add(title)

        //Register Form
        const form = new Form()
        this.add(form)

        //Name Label + Input
        form.add(new Label('Name', 'name'))
        const nameInput = new Input("text", "name")
        form.add(nameInput)

        //Email Label + Input
        form.add(new Label("E-mail", "email"))
        const emailInput = new Input("email", "email")
        form.add(emailInput)

        //Username Label + Input
        form.add(new Label('Username', "username"))
        const usernameInput = new Input("text", "username")
        form.add(usernameInput)

        //Password  Label + Input
        form.add(new Label("Password", "password"))
        const passwordInput = new PasswordInput("password")
        form.add(passwordInput)

        //Repeat Password Label + Input
        form.add(new Label('Repeat Password', 'password-repeat'))
        const passwordRepeatInput = new PasswordInput('password-repeat')
        form.add(passwordRepeatInput)


        //Button Register
        const submitButton = new Button('Register', 'submit')
        form.add(submitButton)

        form.addBehavior("submit", event => {
            event.preventDefault()

            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()
            const passwordRepeat = passwordRepeatInput.getValue()

            // el try catch va por fuera de la funcion,(el throw va adentro) seria la condicion por la que tiene que pasar el evento para dar un resultado
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
        // link Login
        const loginLink = new Link("Login")
        this.add(loginLink)

        // Evento Login Link
        loginLink.addBehavior('click', event => {
            event.preventDefault()

            this.removeSelf()

            page.add(login)
        })
    }
}