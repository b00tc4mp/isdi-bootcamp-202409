//function de login
class Login extends Compo {
    constructor() {
        super(document.createElement('section'))

        let compo = this

        compo.container.classList.add('section-container')
        let title = new Heading('LOGIN', 2)
        compo.add(title)

        let form = new Form()
        compo.add(form)

        form.add(new Label('Username', 'username'))
        let usernameInput = new Input('text', 'username')
        form.add(usernameInput)

        form.add(new Label('Password', 'password'))
        let passwordInput = new PasswordInput('password')
        form.add(passwordInput)

        let submitButton = new Button('Login', 'submit')
        form.add(submitButton)

        form.addBehavior('submit', function (event) {
            event.preventDefault()

            let username = usernameInput.getValue()
            let password = passwordInput.getValue()

            try {
                loggedInUser = authenticateUser(username, password)

                form.reset()

                compo.remove()

                //SECCIÓN HOME
                homeSection = new Home()

                page.add(homeSection)

            } catch (error) {
                passwordInput.children[0].setValue('')

                alert(error.message)

                console.error(error)
            }
        })

        //CREACIÓN LINK TIPO ANCHOR QUE TE LLEVA A LA SECCIÓN DE REGISTRO
        let registerAccount = new Heading("Don't have an account?", 4)
        compo.add(registerAccount)
        let registerLink = new Link('Register')
        compo.add(registerLink)

        registerLink.addBehavior('click', function (event) {
            event.preventDefault()

            compo.remove()

            //SECCIÓN DE REGISTRO
            let registerSection = new Register()

            page.add(registerSection)
        })

    }
}