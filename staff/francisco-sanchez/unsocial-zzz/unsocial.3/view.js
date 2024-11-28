//FUNCIONES CONSTRUCTORAS

//Construye fields
function buildFormField(id, text, type) {
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id

    return [label, input]
}

//Construye buttons
function buildButton(text, type) {
    var button = document.createElement('button')
    button.type = type
    button.innerText = text

    return button
}

//SECTION LOGIN
function buildLoginSection() {
    //FORMULARIO DE LOGIN
    var section = document.createElement('section')

    var loginTitle = document.createElement('h2')
    loginTitle.innerText = 'Login'
    section.appendChild(loginTitle)

    var introText = document.createElement('p')
    introText.innerText = 'Log in to acces your account'
    section.appendChild(introText)

    var form = document.createElement('form')
    section.appendChild(form)

    //Label & Imput Username
    var usernameField = buildFormField('username', 'Username', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    //Label & Imput Password
    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    //Login Button
    var submitButton = buildButton('Login', 'submit')
    form.appendChild(submitButton)

    var registerText = document.createElement('p')
    registerText.innerText = "Don't have an account? Create your account below."
    registerText.className = 'registerText'
    section.appendChild(registerText)


    var loginRegisterLink = document.createElement('a')
    loginRegisterLink.href = ''
    loginRegisterLink.innerText = '> Register <'
    section.appendChild(loginRegisterLink)

    //Evento click del enlace registro
    loginRegisterLink.addEventListener('click', function (event) {
        event.preventDefault()
        section.remove()
        form.reset()
        showRegister()
    })

    //Evento submit del botón login 
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        console.log('Click en botón login')

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {

            loggedUser = authenticateUser(username, password)
            console.log('usuario validado!')
            console.log("Entro en la zona logueada")
            form.reset()
            section.remove()
            showHome()

        } catch (error) {
            passwordField[1].value = ''
            alert(error.message)
            console.error(error)
        }
    })

    return section
}

//SECTION REGISTER
function showRegister() {
    var section = document.createElement('section')

    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    section.appendChild(registerTitle)

    var registerForm = document.createElement('form')
    section.appendChild(registerForm)

    //Label & Imput Name
    var nameField = buildFormField('name', 'Name', 'text')
    registerForm.appendChild(nameField[0])
    registerForm.appendChild(nameField[1])


    //Label & Imput Email
    var emailField = buildFormField('email', 'Your email', 'email')
    registerForm.appendChild(emailField[0])
    registerForm.appendChild(emailField[1])


    //Label & Imput Username
    var usernameField = buildFormField('username', 'Username', 'text')
    registerForm.appendChild(usernameField[0])
    registerForm.appendChild(usernameField[1])


    //Label & Imput Password
    var passwordField = buildFormField('password', 'Password', 'password')
    registerForm.appendChild(passwordField[0])
    registerForm.appendChild(passwordField[1])


    //Label & Imput Password
    var checkPasswordField = buildFormField('check-password', 'Repeat Password', 'password')
    registerForm.appendChild(checkPasswordField[0])
    registerForm.appendChild(checkPasswordField[1])


    //Botón Register
    var submitButton = buildButton('Register', 'submit')
    registerForm.appendChild(submitButton)

    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    section.appendChild(registerLoginLink)

    body.appendChild(section)

    //Evento click del enlace de la página de registro a login
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()
        section.remove()
        body.appendChild(loginSection)
    })

    //Evento submit del botón register
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Pulso en el botón registrar')

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var checkPassword = checkPasswordField[1].value
        //var error = false

        try {
            registerUser(name, email, username, password, checkPassword)

            registerForm.reset();
            section.remove();
            body.appendChild(loginSection)

        } catch (error) {
            alert(error.message)
            console.error(error)
        }

    })
}

//SECCION HOME
function showHome() {
    console.log('Cargo la homepage')

    var section = document.createElement('section')
    var homeTitle = document.createElement('h2')
    homeTitle.innerText = 'Home'
    section.appendChild(homeTitle)

    var homeWelcome = document.createElement('h3')
    homeWelcome.innerText = 'Hello ' + loggedUser.name
    section.appendChild(homeWelcome)

    var logoutClickButton = document.createElement('button')
    logoutClickButton.innerText = 'Logout'
    section.appendChild(logoutClickButton)

    body.appendChild(section)

    //Evento click del botón logout
    logoutClickButton.addEventListener('click', function () {
        loggedUser = null;
        section.remove();
        body.appendChild(loginSection)
    })
}