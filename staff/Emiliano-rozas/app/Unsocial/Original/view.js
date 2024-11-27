function buildFormField(id, text, type, placeholder) {
    var label = document.createElement("label")
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement("input")
    input.type = type
    input.id = id
    input.placeholder = placeholder

    return [label, input]
}

function buildButton(text, type) {
    var button = document.createElement("button")
    button.type = type
    button.innerText = text

    return button
}

function buildAnchor(href, text) {
    var anchor = document.createElement("a")
    anchor.href = href
    anchor.text = text

    return anchor
}


function buildLoginSection() {
    var compo = new Compo(document.createElement("section"))

    var section = compo.container

    var title = document.createElement("h2")
    title.innerText = "Login"
    section.appendChild(title)

    //formulario
    var form = document.createElement("form")
    section.appendChild(form)

    //User label + input juntos en la misma funcion
    var usernameField = buildFormField("username", "Username", "text", "Username here")
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    //Password label + input juntos en la misma funcion
    var passwordField = buildFormField("password", "Password", "password")
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    // boton log in
    var submitButton = buildButton('login', "submit")
    form.appendChild(submitButton)

    form.addEventListener("submit", function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {

            loggedInUser = authenticateUser(username, password)

            form.reset()

            section.remove() // para que desaparezca la vista

            var homeSection = buildHomeSection()

            body.add(homeSection)

        } catch (error) {
            passwordField[1].value = ""

            alert(error.message)

            console.error(error)
        }
    })
    //link register
    var anchor = buildAnchor("", "Register")
    section.appendChild(anchor)

    //Evento register
    anchor.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()

        var registerSection = buildRegisterSection()

        body.add(registerSection)

    })
    return compo
}

function buildRegisterSection() {

    //Register section
    var compo = new Compo(document.createElement('section'))
    section = compo.container

    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    section.appendChild(registerTitle)

    //Register Form
    var form = document.createElement('form')
    section.appendChild(form)

    //Name Label + Input
    var nameField = buildFormField('name', 'Name', 'text')
    form.appendChild(nameField[0])
    form.appendChild(nameField[1])

    //Email Label + Input
    var emailField = buildFormField('email', "E-mail", "email")
    form.appendChild(emailField[0])
    form.appendChild(emailField[1])

    //Username Label + Input
    var usernameField = buildFormField('username', "Username", "text")
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    //Password  Label + Input
    var passwordField = buildFormField('password', "Password", "password")
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    //Repeat Password Label + Input
    var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])

    //Button Register
    var submitButton = buildButton('Register', 'submit')
    form.appendChild(submitButton)

    form.addEventListener("submit", function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        // el try catch va por fuera de la funcion,(el throw va adentro) seria la condicion por la que tiene que pasar el evento para dar un resultado
        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            section.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })
    // link Login
    var anchor = buildAnchor("", "Login")
    section.appendChild(anchor)

    // Evento Login Link
    anchor.addEventListener("click", function (event) {
        event.preventDefault()

        section.remove()

        body.add(loginSection)
    })

    return compo
}

function buildHomeSection() {
    //creamos los elementos
    //Creamos section
    var compo = new Compo(document.createElement("section"))
    //Creamos el titulo
    var section = compo.container
    var title = document.createElement("h2")
    title.innerText = "Home"
    section.appendChild(title)
    //Creamos la bienvenida

    var greetingTitle = document.createElement("h3")
    greetingTitle.innerText = "Hello, " + loggedInUser.name + "!"
    section.appendChild(greetingTitle)
    //Creamos el boton

    var logoutButton = buildButton("logout", "button")
    section.appendChild(logoutButton)

    logoutButton.addEventListener("click", function (event) {
        event.preventDefault()

        loggedInUser = null

        section.remove()

        body.add(loginSection)
    })

    return compo
}


