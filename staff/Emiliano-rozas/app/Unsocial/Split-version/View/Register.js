function Register() {
    //Register section
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Register', 2)
    this.add(title)

    //Register Form
    var form = new Form()
    this.add(form)

    //Name Label + Input
    form.add(new Label('Name', 'name'))
    var nameInput = new Input("text", "name")
    form.add(nameInput)

    //Email Label + Input
    form.add(new Label("E-mail", "email"))
    var emailInput = new Input("email", "email")
    form.add(emailInput)

    //Username Label + Input
    form.add(new Label('Username', "username"))
    var usernameInput = new Input("text", "username")
    form.add(usernameInput)

    //Password  Label + Input
    form.add(new Label("Password", "password"))
    var passwordInput = new PasswordInput("password")
    form.add(passwordInput)

    //Repeat Password Label + Input
    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new PasswordInput('password-repeat')
    form.add(passwordRepeatInput)


    //Button Register
    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehavior("submit", function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var passwordRepeat = passwordRepeatInput.getValue()

        // el try catch va por fuera de la funcion,(el throw va adentro) seria la condicion por la que tiene que pasar el evento para dar un resultado
        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            this.remove()

            page.add(login)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }.bind(this))
    // link Login
    var loginLink = new Link("Login")
    this.add(loginLink)

    // Evento Login Link
    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        this.remove()

        page.add(login)
    }.bind(this))
}
Register.extends(Compo)