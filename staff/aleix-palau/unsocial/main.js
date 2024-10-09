var loggedInUser = null

// LOGIN SECTION
var loginSection = document.createElement('section')
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)
var loginForm = document.createElement('form')
loginSection.appendChild(loginForm)
var loginUsernameLabel = document.createElement('label')
loginUsernameLabel.htmlFor = 'login-username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)
var loginUsernameInput = document.createElement('input')
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'login-username'
loginUsernameInput.required = true
loginForm.appendChild(loginUsernameInput)
var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.htmlFor = 'login-password'
loginPasswordLabel.innerText = 'Password'
loginForm.appendChild(loginPasswordLabel)
var loginPasswordInput = document.createElement('input')
loginPasswordInput.type = 'password'
loginPasswordInput.id = 'login-password'
loginPasswordInput.required = true
loginForm.appendChild(loginPasswordInput)
var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)

// LOGIN TAB -> LOGIN BUTTON
loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var loginUsername = loginUsernameInput.value
    var loginPassword = loginPasswordInput.value

    try {
        loggedInUser = authenticateUser(loginUsername, loginPassword)

        loginForm.reset()

        loginSection.remove()

        // HOME SECTION
        var homeSection = document.createElement('section')
        var homeTitle = document.createElement('h2')
        homeTitle.innerText = 'Home'
        homeSection.appendChild(homeTitle)
        var homeUserTitle = document.createElement('h3')
        homeUserTitle.innerText = 'Hello, ' + loggedInUser.username + '!'
        homeSection.appendChild(homeUserTitle)
        var homeLogoutButton = document.createElement('button')
        homeLogoutButton.innerText = 'Logout'
        homeSection.appendChild(homeLogoutButton)

        // HOME TAB -> LOGOUT BUTTON
        homeLogoutButton.addEventListener('click', function (event) {
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

var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

// LOGIN TAB -> REGISTER LINK
loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginSection.remove()

    // REGISTER SECTION
    var registerSection = document.createElement('section')
    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    registerSection.appendChild(registerTitle)
    var registerForm = document.createElement('form')
    registerSection.appendChild(registerForm)
    var registerNameLabel = document.createElement('label')
    registerNameLabel.htmlFor = 'register-name'
    registerNameLabel.innerText = 'Name'
    registerForm.appendChild(registerNameLabel)
    var registerNameInput = document.createElement('input')
    registerNameInput.type = 'text'
    registerNameInput.id = 'register-name'
    registerNameInput.required = true
    registerForm.appendChild(registerNameInput)
    var registerEmailLabel = document.createElement('label')
    registerEmailLabel.htmlFor = 'register-email'
    registerEmailLabel.innerText = 'E-mail'
    registerForm.appendChild(registerEmailLabel)
    var registerEmailInput = document.createElement('input')
    registerEmailInput.type = 'email'
    registerEmailInput.id = 'register-email'
    registerEmailInput.required = true
    registerForm.appendChild(registerEmailInput)
    var registerUsernameLabel = document.createElement('label')
    registerUsernameLabel.htmlFor = 'register-username'
    registerUsernameLabel.innerText = 'Username'
    registerForm.appendChild(registerUsernameLabel)
    var registerUsernameInput = document.createElement('input')
    registerUsernameInput.type = 'text'
    registerUsernameInput.id = 'register-username'
    registerUsernameInput.required = true
    registerForm.appendChild(registerUsernameInput)
    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'register-password'
    registerPasswordLabel.innerText = 'Password'
    registerForm.appendChild(registerPasswordLabel)
    var registerPasswordInput = document.createElement('input')
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'register-password'
    registerPasswordInput.required = true
    registerForm.appendChild(registerPasswordInput)
    var registerPasswordRepeatLabel = document.createElement('label')
    registerPasswordRepeatLabel.htmlFor = 'register-password-repeat'
    registerPasswordRepeatLabel.innerText = 'Repeat password'
    registerForm.appendChild(registerPasswordRepeatLabel)
    var registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'register-password-repeat'
    registerPasswordRepeatInput.required = true
    registerForm.appendChild(registerPasswordRepeatInput)
    var registerSubmitButton = document.createElement('button')
    registerSubmitButton.type = 'submit'
    registerSubmitButton.innerText = 'Register'
    registerForm.appendChild(registerSubmitButton)

    // REGISTER TAB -> REGISTER BUTTON
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault()

        var name = registerNameInput.value
        var email = registerEmailInput.value
        var username = registerUsernameInput.value
        var password = registerPasswordInput.value
        var passwordRepeat = registerPasswordRepeatInput.value

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

    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    registerSection.appendChild(registerLoginLink)

    // REGISTER TAB -> LOGIN LINK
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()

        registerSection.remove()

        body.appendChild(loginSection)
    })

    body.appendChild(registerSection)
})

// BODY SECTION
var body = document.querySelector('body')
body.appendChild(loginSection)