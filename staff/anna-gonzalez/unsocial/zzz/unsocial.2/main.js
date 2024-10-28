var loggedInUser = null

//LOGIN SECTION
var loginSection = document.createElement('section')
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)

//login form
var loginForm = document.createElement('form')
loginSection.appendChild(loginForm)

//login username label & input
var loginUsernameLabel = document.createElement('label')
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)
var loginUsernameInput = document.createElement('input')
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'
loginForm.appendChild(loginUsernameInput)

//login password label & input
var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.htmlFor = 'password'
loginPasswordLabel.innerText = 'Password'
loginForm.appendChild(loginPasswordLabel)
var loginPasswordInput = document.createElement('input')
loginPasswordInput.type = 'password'
loginPasswordInput.id = 'password'
loginForm.appendChild(loginPasswordInput)

//login form submit button
var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)

//event login form submit button
loginForm.onsubmit = function (event) {
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try { //call the declarated function
        loggedInUser = loginUser(username, password)

        loginForm.reset()

        homeTitleUser.innerText = 'Hello, ' + loggedInUser.name + '!'

        loginSection.remove()
        body.appendChild(homeSection)
    } catch (error) {
        loginPasswordInput.value = ''

        alert(error.message)

        console.error(error)
    }
}

//login register link
var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

// event of login register link
loginRegisterLink.onclick = function (event) {
    event.preventDefault()

    loginSection.remove()
    body.appendChild(registerSection)
}

var body = document.querySelector('body')
body.appendChild(loginSection)

// REGISTER SECTION
var registerSection = document.createElement('section')
var registerTitle = document.createElement('h2')
registerTitle.innerText = 'Register'
registerSection.appendChild(registerTitle)

// register form
var registerForm = document.createElement('form')
registerSection.appendChild(registerForm)

// register name label & input
var registerNameLabel = document.createElement('label')
registerNameLabel.htmlFor = 'name'
registerNameLabel.innerText = 'Name'
registerForm.appendChild(registerNameLabel)
var registerNameInput = document.createElement('input')
registerNameInput.type = 'text'
registerNameInput.id = 'name'
registerForm.appendChild(registerNameInput)

// register email label & input
var registerEmailLabel = document.createElement('label')
registerEmailLabel.htmlFor = 'email'
registerEmailLabel.innerText = 'E-mail'
registerForm.appendChild(registerEmailLabel)
var registerEmailInput = document.createElement('input')
registerEmailInput.type = 'text'
registerEmailInput.id = 'email'
registerForm.appendChild(registerEmailInput)

// register username label & input
var registerUsernameLabel = document.createElement('label')
registerUsernameLabel.htmlFor = 'username'
registerUsernameLabel.innerText = 'Username'
registerForm.appendChild(registerUsernameLabel)
var registerUsernameInput = document.createElement('input')
registerUsernameInput.type = 'text'
registerUsernameInput.id = 'username'
registerForm.appendChild(registerUsernameInput)

//register password label & input
var registerPasswordLabel = document.createElement('label')
registerPasswordLabel.htmlFor = 'password'
registerPasswordLabel.innerText = 'Password'
registerForm.appendChild(registerPasswordLabel)
var registerPasswordInput = document.createElement('input')
registerPasswordInput.type = 'password'
registerPasswordInput.id = 'password'
registerForm.appendChild(registerPasswordInput)

//register repeat password label & input
var registerPasswordRepeatLabel = document.createElement('label')
registerPasswordRepeatLabel.htmlFor = 'password-repeat'
registerPasswordRepeatLabel.innerText = 'Repeat password'
registerForm.appendChild(registerPasswordRepeatLabel)
var registerPasswordRepeatInput = document.createElement('input')
registerPasswordRepeatInput.type = 'password'
registerPasswordRepeatInput.id = 'password-repeat'
registerForm.appendChild(registerPasswordRepeatInput)

//register form submit button
var registerSubmitButton = document.createElement('button')
registerSubmitButton.type = 'submit'
registerSubmitButton.innerText = 'Register'
registerForm.appendChild(registerSubmitButton)

//event of register form submit button
registerForm.onsubmit = function (event) {
    event.preventDefault()

    var name = registerNameInput.value
    var email = registerEmailInput.value
    var username = registerUsernameInput.value
    var password = registerPasswordInput.value
    var passwordRepeat = registerPasswordRepeatInput.value

    try { //call the declarated function
        registerUser(name, email, username, password, passwordRepeat)

        registerForm.reset()

        registerSection.remove()
        body.appendChild(loginSection)
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

//register login link
var registerLoginLink = document.createElement('a')
registerLoginLink.href = ''
registerLoginLink.innerText = 'Login'
registerSection.appendChild(registerLoginLink)

//event of register login link
registerLoginLink.onclick = function (event) {
    event.preventDefault()

    registerSection.remove()
    body.appendChild(loginSection)
}

//HOME SECTION
var homeSection = document.createElement('section')
var homeSectionTitle = document.createElement('h2')
homeSectionTitle.innerText = 'Home'
homeSection.appendChild(homeSectionTitle)

//home h3
var homeTitleUser = document.createElement('h3')
homeTitleUser.innerText = ''
homeSection.appendChild(homeTitleUser)

//home logout button
var homeLogoutButton = document.createElement('button')
homeLogoutButton.innerText = 'Logout'
homeSection.appendChild(homeLogoutButton)

//event home logout button
homeLogoutButton.onclick = function (event) {
    event.preventDefault()

    homeSection.remove()
    body.appendChild(loginSection)
}