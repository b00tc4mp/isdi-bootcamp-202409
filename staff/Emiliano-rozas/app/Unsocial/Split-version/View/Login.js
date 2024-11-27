class Login extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading("login", 2)
        this.add(title)

        //formulario
        const form = new Form()
        this.add(form)

        //User credentials
        form.add(new Label('Username', 'username'))
        const usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label("Password", "password"))
        const passwordInput = new PasswordInput("password")
        form.add(passwordInput)


        // boton log in
        const submitButton = new Button('Login', "submit")
        form.add(submitButton)

        form.addBehavior("submit", event => {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {

                loggedInUser = authenticateUser(username, password)

                form.reset()

                this.removeSelf() // para que desaparezca la vista

                home = new Home()

                page.add(home)

            } catch (error) {
                passwordInput.setValue("")

                alert(error.message)

                console.error(error)
            }
        })

        //link register
        const registerLink = new Link("Register")
        this.add(registerLink)

        //Evento register
        registerLink.addBehavior('click', event => {
            event.preventDefault()

            this.removeSelf()

            const register = new Register()

            page.add(register)

        })

    }
}