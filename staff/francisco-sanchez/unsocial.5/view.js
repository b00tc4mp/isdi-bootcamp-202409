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

function buildForm() {
    var compo = new Form(document.createElement('form'))

    return compo
}

//Construye buttons

function buildButton(text, type) {
    var compo = new Compo(document.createElement('button'))

    compo.container.type = type
    compo.container.innerText = text

    return compo
}

//SECTION LOGIN
function buildLoginSection() {
    //FORMULARIO DE LOGIN
    var compo = new Compo(document.createElement('section'))

    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    //Label & Imput Username
    var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    //Label & Imput Password
    var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    //Login Button
    var submitButton = buildButton('Login', 'submit')
    form.add(submitButton)

    var registerText = document.createElement('p')
    registerText.innerText = "Don't have an account? Create your account below."
    registerText.className = 'registerText'
    compo.container.appendChild(registerText)


    var loginRegisterLink = document.createElement('a')
    loginRegisterLink.href = ''
    loginRegisterLink.innerText = '> Register <'
    compo.container.appendChild(loginRegisterLink)

    //Evento click del enlace registro
    loginRegisterLink.addEventListener('click', function (event) {
        event.preventDefault()
        compo.remove()
        form.container.reset()
        var register = showRegister()
        body.add(register)
    })

    //Evento submit del botón login 
    form.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {

            loggedUser = authenticateUser(username, password)
            form.reset()
            compo.remove()
            var home = showHome()
            body.add(home)


        } catch (error) {
            passwordField[1].value = ''
            alert(error.message)
            console.error(error)
        }
    })
    return compo
}

//SECTION REGISTER
function showRegister() {

    var compo = new Compo(document.createElement('section'))

    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    compo.container.appendChild(registerTitle)

    var form = buildForm()
    compo.add(form)

    //Label & Imput Name
    var nameField = buildFormField('name', 'Name', 'text')
    form.container.appendChild(nameField[0])
    form.container.appendChild(nameField[1])


    //Label & Imput Email
    var emailField = buildFormField('email', 'Your email', 'email')
    form.container.appendChild(emailField[0])
    form.container.appendChild(emailField[1])


    //Label & Imput Username
    var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])


    //Label & Imput Password
    var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])


    //Label & Imput Password
    var checkPasswordField = buildFormField('check-password', 'Repeat Password', 'password')
    form.container.appendChild(checkPasswordField[0])
    form.container.appendChild(checkPasswordField[1])


    //Botón Register
    var submitButton = buildButton('Register', 'submit')
    form.add(submitButton)

    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    compo.container.appendChild(registerLoginLink)

    //body.appendChild(compo)

    //Evento click del enlace de la página de registro a login
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()
        compo.remove()
        body.add(loginSection)
    })

    //Evento submit del botón register
    form.container.addEventListener('submit', function (event) {
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

            form.container.reset();
            compo.remove();
            body.add(loginSection)

        } catch (error) {
            alert(error.message)
            console.error(error)
        }

    })
    return compo
}

//SECCION HOME
function showHome() {

    var compo = new Compo(document.createElement('section'))


    //var section = document.createElement('section')
    var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title)

    var homeWelcome = document.createElement('h3')
    homeWelcome.innerText = 'Hello ' + loggedUser.name
    compo.container.appendChild(homeWelcome)

    var logoutButton = buildButton('Logout', 'button')
    compo.add(logoutButton)

    //Evento click del botón logout
    logoutButton.container.addEventListener('click', function (event) {
        event.preventDefault()
        loggedUser = null;
        compo.remove();
        body.add(loginSection)
    })

    return compo
}