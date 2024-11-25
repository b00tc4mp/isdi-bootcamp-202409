
var loggedInUser = null
//create login section
var loginSection = document.createElement('section')
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)
//create a form
var loginForm = document.createElement('form')
loginSection.appendChild(loginForm)
var loginUsernameLabel = document.createElement('label')
//create label username     
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)
//create input username        
var loginUsernameInput = document.createElement('input')
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'
loginForm.appendChild(loginUsernameInput)
//create label password     
var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.htmlFor = 'password'
loginPasswordLabel.innerText = 'Password'
loginForm.appendChild(loginPasswordLabel)
//create input password
var loginPasswordInput = document.createElement('input')
loginPasswordInput.type = 'password'
loginPasswordInput.id = 'password'
loginForm.appendChild(loginPasswordInput)
//create button in login
var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)
//create anchor link in Login to Register
var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

//create a function to login
loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try {
        loggedInUser = authenticateUser(username, password)

        loginSection.remove()

        loginForm.reset()

        var homeSection = document.createElement('section')

        var homeTitle = document.createElement('h2')
        homeTitle.innertext = 'Home'
        homeSection.appendChild(homeTitle)

        var homeSubtitle = document.createElement('h3')
        homeSection.appendChild(homeSubtitle)

        var homeUserTitle = homeSubtitle
        homeUserTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
        // crate a button for return to login 
        var logoutSubmitButton = document.createElement('button')
        logoutSubmitButton.type = 'submit'
        logoutSubmitButton.innerText = 'Logout'
        homeSection.appendChild(logoutSubmitButton)

        //create a function for return to login
        logoutSubmitButton.addEventListener('click', function (event) {
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
//create function in login to register link
loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginSection.remove()
    //create new section to register
    var registerSection = document.createElement('section')

    //create a title to register          
    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    registerSection.appendChild(registerTitle)

    //create a form
    var registerForm = document.createElement('form')
    registerSection.appendChild(registerForm)

    //create a label for name
    var registerNameLabel = document.createElement('label')
    registerNameLabel.htmlFor = 'name'
    registerNameLabel.innerText = 'Name'
    registerForm.appendChild(registerNameLabel)

    //create a input for a name
    var registerNameInput = document.createElement('input')
    registerNameInput.type = 'text'
    registerNameInput.id = 'name'
    registerForm.appendChild(registerNameInput)

    //create a label for email
    var registerEmailLabel = document.createElement('label')
    registerEmailLabel.htmlFor = 'email'
    registerEmailLabel.innerText = 'Email'
    registerForm.appendChild(registerEmailLabel)

    //create a input for email
    var registerEmailInput = document.createElement('input')
    registerEmailInput.type = 'text'
    registerEmailInput.id = 'email'
    registerForm.appendChild(registerEmailInput)

    //create a label for username
    var registerUsernameLabel = document.createElement('label')
    registerUsernameLabel.htmlFor = 'username'
    registerUsernameLabel.innerText = 'Username'
    registerForm.appendChild(registerUsernameLabel)

    //create a input for username          
    var registerUsernameInput = document.createElement('input')
    registerUsernameInput.type = 'text'
    registerUsernameInput.id = 'username'
    registerForm.appendChild(registerUsernameInput)

    //create a label for password          
    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'password'
    registerPasswordLabel.innerText = 'Password'
    registerForm.appendChild(registerPasswordLabel)

    //create a input for password
    registerPasswordInput = document.createElement('input')
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'password'
    registerForm.appendChild(registerPasswordInput)

    //create a label for password-repeat       
    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'password-repeat'
    registerPasswordLabel.innerText = 'Repead password'
    registerForm.appendChild(registerPasswordLabel)

    //create a input for password
    registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'password-repeat'
    registerForm.appendChild(registerPasswordRepeatInput)

    //create a button for submit the registration
    var registerSubmitButton = document.createElement('button')
    registerSubmitButton.type = 'submit'
    registerSubmitButton.innerText = 'Register'
    registerForm.appendChild(registerSubmitButton)

    //create a link in register to login
    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    registerSection.appendChild(registerLoginLink)
    //register
    registerForm.addEventListener('submit', function (event) {

        event.preventDefault()
        var nameInput = registerNameInput.value
        var emailInput = registerEmailInput.value
        var usernameInput = registerUsernameInput.value
        var passwordInput = registerPasswordInput.value
        var passwordRepeat = registerPasswordRepeatInput.value

        try {
            registerUser(nameInput, emailInput, usernameInput, passwordInput, passwordRepeat)

            registerSection.remove()

            registerForm.reset()

            body.appendChild(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })
    //create a function for a button Login          
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()

        registerSection.remove()
        body.appendChild(loginSection)
    })

    body.appendChild(registerSection)

})
var body = document.querySelector('body')
body.appendChild(loginSection)
body.appendChild(loginSection)