//Presentation
var loggedInUser = null

var loginSection = document.createElement('section')
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'LOGIN'
loginSection.appendChild(loginTitle)

var loginForm = document.createElement('form')
loginSection.appendChild(loginForm)

var loginUsernameLabel = document.createElement('label')
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)

var loginUsernameInput = document.createElement('input')
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'
loginForm.appendChild(loginUsernameInput)

var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.htmlFor = 'password'
loginPasswordLabel.innerText = 'Password'
loginForm.appendChild(loginPasswordLabel) 

var loginPasswordInput = document.createElement('input')
loginPasswordInput.type = 'password'
loginPasswordInput.id = 'password'
loginForm.appendChild(loginPasswordInput)

var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginSubmitButton.href = ''
loginForm.appendChild(loginSubmitButton)

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try {
        loggedInUser = authenticateUser(username, password)

        loginForm.reset()

        loginSection.remove()

        //SECCIÓN HOME
        var homeSection = document.createElement('section')

        var homeTitle = document.createElement('h2')
        homeTitle.innerText = 'HOME'
        homeSection.appendChild(homeTitle)

        var homeWelcome = document.createElement('h3')
        homeWelcome.innerText = 'Welcome, ' + loggedInUser.name + '!'
        homeSection.appendChild(homeWelcome)

        var logOut = document.createElement('button')
        logOut.type = 'button'
        logOut.innerText = 'LogOut'
        logOut.href = ''
        homeSection.appendChild(logOut)

        logOut.addEventListener('click', function (event) {
            event.preventDefault()
            loggedInUser = null
            homeSection.remove()
            body.appendChild(loginSection)

        })

        body.appendChild(homeSection)

    } catch (error) {
        loginPasswordInput.value = ''

        alert(error.message)

        console.error(error)
    }
})

//CREACIÓN LINK TIPO ANCHOR QUE TE LLEVA A LA SECCIÓN DE REGISTRO
var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginSection.remove()

    //SECCIÓN DE REGISTRO
    var registerSection = document.createElement('section')
    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'REGISTER'
    registerSection.appendChild(registerTitle)

    var registerForm = document.createElement('form')
    registerSection.appendChild(registerForm)

    var registerNameLabel = document.createElement('label')
    registerNameLabel.htmlFor = 'name'
    registerNameLabel.innerText = 'Name'
    registerForm.appendChild(registerNameLabel)
    var registerNameInput = document.createElement('input')
    registerNameInput.type = 'text'
    registerNameInput.id = 'name'
    registerForm.appendChild(registerNameInput)

    var registerEmailLabel = document.createElement('label')
    registerEmailLabel.htmlFor = 'email'
    registerEmailLabel.innerText = 'E-mail'
    registerForm.appendChild(registerEmailLabel)
    var registerEmailInput = document.createElement('input')
    registerEmailInput.type = 'email'
    registerEmailInput.id = 'email'
    registerForm.appendChild(registerEmailInput)

    var registerUsernameLabel = document.createElement('label')
    registerUsernameLabel.htmlFor = 'username'
    registerUsernameLabel.innerText = 'Username'
    registerForm.appendChild(registerUsernameLabel)
    var registerUsernameInput = document.createElement('input')
    registerUsernameInput.type = 'text'
    registerUsernameInput.id = 'username'
    registerForm.appendChild(registerUsernameInput)

    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'password'
    registerPasswordLabel.innerText = 'Password'
    registerForm.appendChild(registerPasswordLabel)
    var registerPasswordInput = document.createElement('input')
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'password'
    registerForm.appendChild(registerPasswordInput)

    var registerPasswordRepeatLabel = document.createElement('label')
    registerPasswordRepeatLabel.htmlFor = 'password-repeat'
    registerPasswordRepeatLabel.innerText = 'Repeat password'
    registerForm.appendChild(registerPasswordRepeatLabel)
    var registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'password-repeat'
    registerForm.appendChild(registerPasswordRepeatInput)

    var registerSubmitButton = document.createElement('button')
    registerSubmitButton.type = 'submit'
    registerSubmitButton.innerText = 'Register'
    registerForm.appendChild(registerSubmitButton)

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = registerNameInput.value
        var email = registerEmailInput.value
        var username = registerUsernameInput.value
        var password = registerPasswordInput.value
        var repeatpassword = registerPasswordRepeatInput.value

        try {
            registerUser(name, email, username, password, repeatpassword)

            registerForm.reset()
            registerSection.remove()
            body.appendChild(loginSection)

        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    })

    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    registerSection.appendChild(registerLoginLink)

    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()

        registerSection.remove()
        body.appendChild(loginSection)
    })

    body.appendChild(registerSection)
})

var body = document.querySelector('body')
body.appendChild(loginSection)