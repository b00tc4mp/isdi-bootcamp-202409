
// Funcion que crea el elemento label para poder cearlo llamado la funcion 
// con id  text  type
function buildFormField(id, text, type) {
    var label = document.createElement("label") //Crea el elemento label
    label.htmlFor = id //Introduce un for
    label.innerText = text  //Intrduce un texto 

    var input = document.createElement("input")
    input.type = type  //Introduce un type
    input.id = id // Intoduce una id

    return [label, input]  //crea un array porque el return no puede devolver mas de 1
}

// Funcion que crea el elemento button para poder cearlo llamado la funcion 
// text  type
function buildButton(text, type) {
    var button = document.createElement("button")
    button.type = type
    button.innerText = text

    return button
}
//Llamamos la funcion constructora del login section 
function buildLoginSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Login'
    section.appendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)
    //Llamamos la funcion constructora de field / label 
    var usernameField = buildFormField("username", "Username", "text")
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField("password", "Passsword", "password")
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var submitButton = buildButton("Login", "submit")
    form.appendChild(submitButton)

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            section.remove()

            var homeSection = buildHomeSection()

            body.appendChild(homeSection)
        } catch (error) {

            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    })

    var regiserLink = document.createElement('a')
    regiserLink.href = ''
    regiserLink.innerText = 'Register'
    section.appendChild(regiserLink)

    regiserLink.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()

        var registerSection = buildRegisterSection()

        body.appendChild(registerSection)
    })

    return section //Retorna la Section 
}
//Llamamos a la constructora del Register Section
function buildRegisterSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Register'
    section.appendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)

    var nameField = buildFormField("name", "Name", "text")
    form.appendChild(nameField[0])
    form.appendChild(nameField[1])

    var emailField = buildFormField("email", "E-mail", "email")
    form.appendChild(emailField[0])
    form.appendChild(emailField[1])

    var usernameField = buildFormField("username", "Username", "text")
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField("password", "Password", "password")
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var passwordRepeatField = buildFormField("password-repeat", "Repeat Password", "password")
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])

    var submitButton = buildButton("Register", "submit")
    form.appendChild(submitButton)

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            section.remove()

            body.appendChild(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    })

    var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    section.appendChild(loginLink)

    loginLink.addEventListener('click', function (event) {
        event.preventDefault()

        section.remove()
        body.appendChild(loginSection)
    })

    return section
}
// Se llama a la constructora Home Section 
function buildHomeSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Home'
    section.appendChild(title)

    var usertitle = document.createElement('h3')
    usertitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    section.appendChild(usertitle)

    var homeLogoutButton = document.createElement('button')
    homeLogoutButton.innerText = 'Logout'
    section.appendChild(homeLogoutButton)
    //Evento de boton "Logout" 
    homeLogoutButton.addEventListener('click', function (event) {
        event.preventDefault()  // Parar cargar la paguina web

        loggedInUser = null

        section.remove()

        body.appendChild(loginSection)// LLamar al body a la login Section 
    })

    return section
}