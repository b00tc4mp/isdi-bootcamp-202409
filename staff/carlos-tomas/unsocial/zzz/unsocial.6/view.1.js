function buildLoginSection() {
    var compo = new Compo(document.createElement("form"))

    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    //Llamamos la funcion constructora de field / label 
    var usernameField = buildFormField("username", "Username", "text")
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    var passwordField = buildFormField("password", "Passsword", "password")
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    var submitButton = buildButton("Login", "submit")
    form.add(submitButton)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {

            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    })

    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    compo.container.appendChild(registerLink)

    registerLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.remove()

        var registerSection = buildRegisterSection()

        body.add(registerSection)
    })

    return compo //Retorna 
}
//Llamamos a la constructora del Register Section
function buildRegisterSection() {
    var compo = new Compo(document.createElement('section'))



    var title = document.createElement('h2')
    title.innerText = 'Register'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    var nameField = buildFormField("name", "Name", "text")
    form.container.appendChild(nameField[0])
    form.container.appendChild(nameField[1])

    var emailField = buildFormField("email", "E-mail", "email")
    form.container.appendChild(emailField[0])
    form.container.appendChild(emailField[1])

    var usernameField = buildFormField("username", "Username", "text")
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    var passwordField = buildFormField("password", "Password", "password")
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    var passwordRepeatField = buildFormField("password-repeat", "Repeat Password", "password")
    form.container.appendChild(passwordRepeatField[0])
    form.container.appendChild(passwordRepeatField[1])

    var submitButton = buildButton("Register", "submit")
    form.container.appendChild(submitButton.container)

    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            compo.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    })

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    compo.container.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        compo.remove()
        body.add(loginSection)
    })

    return compo
}
// Se llama a la constructora Home Section 
function buildHomeSection() {
    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    compo.add(logoutButton)
    //Evento de boton "Logout" 
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault()  // Parar cargar la paguina web

        loggedInUser = null

        compo.remove()

        body.add(loginSection)// LLamar al body a la login Section 
    })

    return compo
}