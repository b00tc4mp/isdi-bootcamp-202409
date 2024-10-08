var loggedInUser = null // Variable para reconocer al usuario conectado

var loginSection = document.createElement('section') // Creación de la sección login y sus elementos

var loginTitle = document.createElement('h2') // Título Login
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)

var loginForm = document.createElement('form') // El formulario del login
loginSection.appendChild(loginForm)

var loginUsernameLabel = document.createElement('label') // El texto "Username"
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)

var loginUsernameInput = document.createElement('input') // El input de username
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'
loginForm.appendChild(loginUsernameInput)

var loginPasswordLabel = document.createElement('label') // El texto "Password"
loginPasswordLabel.htmlFor = 'password'
loginPasswordLabel.innerText = 'Password'
loginForm.appendChild(loginPasswordLabel)

var loginPasswordInput = document.createElement('input') // El input de password
loginPasswordInput.type = "password"
loginPasswordInput.id = "password"
loginForm.appendChild(loginPasswordInput)

var loginSubmitButton = document.createElement('button') // El botón de login
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)

// Manu hace: loginForm.addEventListener('submit', function(event) { ... }) Es lo correcto, porque el formulario se envia
loginForm.addEventListener('submit', function (event) { // Botón login (borramos login y montamos home)
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try {
        loggedInUser = authenticateUser(username, password) // Llamamos a la función para confirmar que el usuario existe

        loginSection.remove() // Borramos el login

        loginForm.reset() // Borramos el form del login (porque salimos de login)

        var homeSection = document.createElement('section') // Creación Home

        var homeTitle = document.createElement('h2') // Título de home
        homeTitle.innerText = "Home"
        homeSection.appendChild(homeTitle)

        var homeWelcome = document.createElement('h3') // Texto de bienvenida
        homeWelcome.innerHTML = "Welcome, " + loggedInUser.name + "!"
        homeSection.appendChild(homeWelcome)

        var homeLogoutButton = document.createElement('button') // Botón de logout
        homeLogoutButton.type = "button"
        homeLogoutButton.innerText = "Logout"
        homeSection.appendChild(homeLogoutButton)

        homeLogoutButton.addEventListener("click", function (event) { // Acción del botón de logout (dentro de home)
            event.preventDefault()

            loggedInUser = null // Desconectamos al usuario

            homeSection.remove() // Desmontamos home

            body.appendChild(loginSection) // Volvemos al login
        })
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
    body.appendChild(homeSection) // Montamos home
})

var loginRegisterLink = document.createElement('a') // (Dentro del login) Link a la pantalla de registro
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) { // Borramos login y vamos a la pantalla de registro
    event.preventDefault()

    loginSection.remove() // Desmontamos login

    loginForm.reset() // Borramos el contenido que hubiese escrito en el formulario del login

    var registerSection = document.createElement('section') // Creación de todos los elemenos en la pantalla de registro

    var registerTitle = document.createElement('h2') // Título de registro
    registerTitle.innerText = "Register"
    registerSection.appendChild(registerTitle)

    var registerForm = document.createElement('form') // Creación del formulario que tendrá los campos para el registro
    registerSection.appendChild(registerForm)

    var registerNameLabel = document.createElement('label') // Texto de Name
    registerNameLabel.htmlFor = 'name'
    registerNameLabel.innerText = "Name"
    registerForm.appendChild(registerNameLabel)

    var registerNameInput = document.createElement('input') // Input de Name
    registerNameInput.type = "text"
    registerNameInput.id = "name"
    registerForm.appendChild(registerNameInput)

    var registerEmailLabel = document.createElement('label') // Texto de Email
    registerEmailLabel.htmlFor = "email"
    registerEmailLabel.innerText = "E-mail"
    registerForm.appendChild(registerEmailLabel)

    var registerEmailInput = document.createElement('input') // Input de email
    registerEmailInput.type = "email"
    registerEmailInput.id = "email"
    registerForm.appendChild(registerEmailInput)

    var registerUsernameLabel = document.createElement('label') // Texto de username
    registerUsernameLabel.htmlFor = "username"
    registerUsernameLabel.innerText = "Username"
    registerForm.appendChild(registerUsernameLabel)

    var registerUsernameInput = document.createElement('input') // Input de username
    registerUsernameInput.type = "text"
    registerUsernameInput.id = "username"
    registerForm.appendChild(registerUsernameInput)

    var registerPasswordLabel = document.createElement('label') // Texto de password
    registerPasswordLabel.htmlFor = "password"
    registerPasswordLabel.innerText = "Password"
    registerForm.appendChild(registerPasswordLabel)

    var registerPasswordInput = document.createElement('input') // Input de password
    registerPasswordInput.type = "password"
    registerPasswordInput.id = "password"
    registerForm.appendChild(registerPasswordInput)

    var registerConfirmPasswordLabel = document.createElement('label') // Texto de confirm password
    registerConfirmPasswordLabel.htmlFor = "confirmpassword"
    registerConfirmPasswordLabel.innerText = "Confirm Password"
    registerForm.appendChild(registerConfirmPasswordLabel)

    var registerConfirmPasswordInput = document.createElement('input') // Input de confirm password
    registerConfirmPasswordInput.type = "password"
    registerConfirmPasswordInput.id = "confirmpassword"
    registerForm.appendChild(registerConfirmPasswordInput)

    var registerSubmitButton = document.createElement('button') // Botón de registro
    registerSubmitButton.type = "submit"
    registerSubmitButton.innerText = "Register"
    registerForm.appendChild(registerSubmitButton)

    registerForm.addEventListener('submit', function (event) { // Acción del botón para registrar al usuario y volver a la pantalla login
        event.preventDefault()

        // Guardar todos los valores
        var name = registerNameInput.value
        var email = registerEmailInput.value
        var username = registerUsernameInput.value
        var password = registerPasswordInput.value
        var confirmpassword = registerConfirmPasswordInput.value

        try {
            registerUser(name, email, username, password, confirmpassword) // Llamamos a la función para registrar al usuario

            registerForm.reset() // Borramos el formulario de registro

            registerSection.remove() // "Salimos" de registro

            body.appendChild(loginSection) // Montamos el login
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    var registerLoginLink = document.createElement('a') // Anchor para volve a logit desde registro
    registerLoginLink.href = ""
    registerLoginLink.innerText = "Login"
    registerSection.appendChild(registerLoginLink)

    registerLoginLink.addEventListener('click', function (event) { // Borramos registro y montamos login
        event.preventDefault()

        registerSection.remove() // "Salimos" de registro

        registerForm.reset() // Borramos el formulario de registro

        body.appendChild(loginSection) // Montamos el login
    })

    body.appendChild(registerSection) // Montamos el registro
})

var body = document.querySelector('body') // Variable donde almacenamos el body
body.appendChild(loginSection) // El inicial, empezamos la página enseñando el login