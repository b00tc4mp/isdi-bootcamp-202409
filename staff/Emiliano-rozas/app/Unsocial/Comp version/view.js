function Login() {
    Compo.call(this, document.createElement("section"))

    var compo = this

    var title = new Heading("login", 2)
    compo.add(title)

    //formulario
    var form = new Form()
    compo.add(form)

    //User credentials
    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new PasswordInput('password')
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

            compo.remove() // para que desaparezca la vista

            var home = new Home

            page.add(home)

        } catch (error) {
            passwordInput.setValue("")

            alert(error.message)

            console.error(error)
        }
    })
    //link register
    var registerLink = new Link("Register")
    compo.add(registerLink)

    //Evento register
    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        var register = new Register()

        page.add(register)

    })

}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

function Register() {
    //Register section
    Compo.call(this, document.createElement('section'))

    var compo = this

    var title = new Heading('Register', 2)
    compo.add(title)

    //Register Form
    var form = new Form()
    compo.add(form)

    //Name Label + Input
    form.add(new Label('Name', 'name'))
    var nameInput = new Input("text", "name")
    form.add(nameInput)

    //Email Label + Input
    form.add(new Label("E-mail", "email"))
    var emailInput = new Input("email", "email")
    form.add(emailInput)

    //Username Label + Input
    form.add(new Label('Ssername', "username"))
    var usernameInput = new Input("text", "username")
    form.add(usernameInput)

    //Password  Label + Input
    form.add(new Label('Password', 'password'))
    var passwordInput = new PasswordInput('password')
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

            compo.remove()

            page.add(login)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })
    // link Login
    var loginLink = new Link("Login")
    compo.add(loginLink)

    // Evento Login Link
    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        page.add(login)
    })
}
Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

function Home() {
    //creamos los elementos
    //Creamos section
    Compo.call(this, document.createElement("section"))

    var compo = this

    //Creamos el titulo

    var title = new Heading("Home", 2)
    compo.add(title)
    //Creamos la bienvenida

    var greetingTitle = new Heading("Hello, " + loggedInUser.name + "!", 3)
    compo.add(greetingTitle)
    //Creamos el boton

    var logoutButton = new Button('Logout', 'button')
    compo.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.remove()

        page.add(login)
    })
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home
