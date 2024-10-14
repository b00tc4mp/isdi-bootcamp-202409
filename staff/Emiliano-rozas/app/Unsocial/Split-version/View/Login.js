function Login() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading("login", 2)
    this.add(title)

    //formulario
    var form = new Form()
    this.add(form)

    //User credentials
    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label("Password", "password"))
    var passwordInput = new PasswordInput("password")
    form.add(passwordInput)


    // boton log in
    var submitButton = new Button('Login', "submit")
    form.add(submitButton)

    form.addBehavior("submit", function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {

            loggedInUser = authenticateUser(username, password)

            form.reset()

            this.remove() // para que desaparezca la vista

            home = new Home()

            page.add(home)

        } catch (error) {
            passwordInput.setValue("")

            alert(error.message)

            console.error(error)
        }
    }.bind(this))

    //link register
    var registerLink = new Link("Register")
    this.add(registerLink)

    //Evento register
    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        this.remove()

        var register = new Register()

        page.add(register)

    }.bind(this))

}

Login.extends(Compo)



