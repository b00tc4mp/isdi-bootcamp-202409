//Presentation

var loggedInUser = null

//LOG IN
var loginSection = document.createElement("section")
var loginTitle = document.createElement("h2")
loginTitle.innerText = "Login"
loginSection.appendChild(loginTitle)
//formulario
var loginForm = document.createElement("form")
loginSection.appendChild(loginForm)
//label user
var loginUsernameLabel = document.createElement("label")
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = "Username"
loginForm.appendChild(loginUsernameLabel)
//input user
var loginUsernameInput = document.createElement("input")
loginUsernameInput.id = "username"
loginUsernameInput.placeholder = "Enter your Username"
loginUsernameInput.type = "text"
loginForm.appendChild(loginUsernameInput)
//label password
var loginPasswordLabel = document.createElement("label")
loginPasswordLabel.htmlFor = "password"
loginPasswordLabel.innerText = "password"
loginForm.appendChild(loginPasswordLabel)
//input password
var loginPasswordInput = document.createElement("input")
loginPasswordInput.type = "password"
loginPasswordInput.placeholder = "Enter your password"
loginPasswordInput.id = "password"
loginForm.appendChild(loginPasswordInput)
// boton log in
var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)
//link register
var registerLink = document.createElement('a')
registerLink.href = ''
registerLink.innerText = 'Register'
loginSection.appendChild(registerLink)


//Evento register
registerLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginSection.remove()

    //Register section
    var registerSection = document.createElement('section')

    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    registerSection.appendChild(registerTitle)
    //Register Form
    var registerForm = document.createElement('form')
    registerSection.appendChild(registerForm)
    //label name
    var registerNameLabel = document.createElement('label')
    registerNameLabel.htmlFor = 'name'
    registerNameLabel.innerText = 'Name'
    registerForm.appendChild(registerNameLabel)
    //Input name
    var registerNameInput = document.createElement('input')
    registerNameInput.type = 'text'
    registerNameInput.id = 'name'
    registerForm.appendChild(registerNameInput)
    //label Email
    var registerEmailLabel = document.createElement('label')
    registerEmailLabel.htmlFor = 'email'
    registerEmailLabel.innerText = 'E-mail'
    registerForm.appendChild(registerEmailLabel)
    //input Email
    var registerEmailInput = document.createElement('input')
    registerEmailInput.type = 'text'
    registerEmailInput.id = 'email'
    registerForm.appendChild(registerEmailInput)
    //label Username
    var registerUsernameLabel = document.createElement('label')
    registerUsernameLabel.htmlFor = 'username'
    registerUsernameLabel.innerText = 'Username'
    registerForm.appendChild(registerUsernameLabel)
    //input Username
    var registerUsernameInput = document.createElement('input')
    registerUsernameInput.type = 'text'
    registerUsernameInput.id = 'username'
    registerForm.appendChild(registerUsernameInput)
    //label Password
    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'password'
    registerPasswordLabel.innerText = 'Password'
    registerForm.appendChild(registerPasswordLabel)
    //input Password
    var registerPasswordInput = document.createElement('input')
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'password'
    registerForm.appendChild(registerPasswordInput)
    //repeat password
    var registerPasswordRepeatLabel = document.createElement('label')
    registerPasswordRepeatLabel.htmlFor = 'password-repeat'
    registerPasswordRepeatLabel.innerText = 'Repeat Password'
    registerForm.appendChild(registerPasswordRepeatLabel)
    var registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'password-repeat'
    registerForm.appendChild(registerPasswordRepeatInput)
    //Button Register
    var registerSubmitButton = document.createElement('button')
    registerSubmitButton.type = 'submit'
    registerSubmitButton.innerText = 'Register'
    registerForm.appendChild(registerSubmitButton)
    // link Login
    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    registerSection.appendChild(registerLoginLink)


    registerForm.addEventListener("submit", function (event) {
        event.preventDefault()

        var name = registerNameInput.value
        var email = registerEmailInput.value
        var username = registerUsernameInput.value
        var password = registerPasswordInput.value
        var passwordRepeat = registerPasswordRepeatInput.value

        // el try catch va por fuera de la funcion,(el throw va adentro) seria la condicion por la que tiene que pasar el evento para dar un resultado
        try {
            registerUser(name, email, username, password, passwordRepeat)

            registerForm.reset()

            registerSection.remove()

            body.appendChild(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    // Evento Login Link
    registerLoginLink.addEventListener("click", function (event) {
        event.preventDefault()

        registerSection.remove()
        body.appendChild(loginSection)
    })

    body.appendChild(registerSection)
})

//Evento sobre click en logIn form
loginForm.addEventListener("submit", function (event) {
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try {

        loggedInUser = authenticateUser(username, password)

        loginForm.reset()

        loginSection.remove() // para que desaparezca la vista

        //creamos los elementos
        //Creamos section
        var homeSection = document.createElement("section")
        //Creamos el titulo
        var homeSectionTitle = document.createElement("h2")
        homeSectionTitle.innerText = "Home"
        homeSection.appendChild(homeSectionTitle)
        //Creamos la bienvenida
        var homeGreetingText = document.createElement("h3")
        homeGreetingText.innerText = "Hello, " + loggedInUser.name + "!"
        homeSection.appendChild(homeGreetingText)
        //Creamos el boton
        var homeLogoutButton = document.createElement("button")
        homeLogoutButton.innerText = "Logout"
        homeSection.appendChild(homeLogoutButton)

        homeLogoutButton.addEventListener("click", function (event) {
            event.preventDefault()

            loggedInUser = null

            homeSection.remove()

            body.appendChild(loginSection)
        })

        body.appendChild(homeSection)
    } catch (error) {
        loginPasswordInput.value = ""

        alert(error.message)

        console.error(error)
    }
})

var body = document.querySelector("body")
body.appendChild(loginSection)