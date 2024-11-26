//variable que te almacena datos del usuario loggeado
var loggedInUser = null


//CREACIÓN SECCIONES MEDIANTE JAVASCRIPT

//----- LOGIN SECTION -----  
var logInSection = document.createElement('section')
var logInTitle = document.createElement('h2')
logInTitle.innerText = 'Login'
logInSection.appendChild(logInTitle)

//FORMULARIO DEL LOGIN
var loginForm = document.createElement('form')
logInSection.appendChild(loginForm)

//LOGIN USERNAME LABEL 
var loginUsernameLabel = document.createElement('label')
loginForm.appendChild(loginUsernameLabel)
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'

//LOGIN USERNAME INPUT 
var loginUsernameInput = document.createElement('input')
loginForm.appendChild(loginUsernameInput)
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'

//LOGIN PASSWORD LABEL 
var logInPasswordLabel = document.createElement('label')
loginForm.appendChild(logInPasswordLabel)
logInPasswordLabel.htmlFor = 'password'
logInPasswordLabel.innerText = 'Password'

//LOGIN PASSWORD INPUT 
var logInPasswordInput = document.createElement('input')
loginForm.appendChild(logInPasswordInput)
logInPasswordInput.type = 'password'
logInPasswordInput.id = 'password'

//LOGIN SUBMIT BUTTON 
var loginButton = document.createElement('button')
loginForm.appendChild(loginButton)
loginButton.innerText = 'Log In'
loginButton.type = 'submit'
loginButton.id = 'but'

//LOGIN REGISTER ANCHOR 
var loginResgisterAnchor = document.createElement('a')
loginResgisterAnchor.href = ''
loginResgisterAnchor.innerText = 'Register'
loginForm.appendChild(loginResgisterAnchor)

//SE CREA EL BODY Y SE LE AÑADEN LOS HIJOS
var body = document.querySelector('body')
body.appendChild(logInSection)

//HACEMOS EL LOGIN 
loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = logInPasswordInput.value

    var loggedUser = { username: username, password: password }
    loggedInUser = loggedUser

    try {

        loggedInUser = authenticateUser(username, password)

        loginForm.reset()

        logInSection.remove()

        //----- HOME SECTION -----  
        var homeSection = document.createElement('section')

        var homeTitle = document.createElement('h2')
        homeTitle.innerText = 'HOME'
        homeSection.appendChild(homeTitle)

        var welcomeText = document.createElement('h3')
        homeSection.appendChild(welcomeText)
        welcomeText.innerText = 'Welcome, ' + loggedInUser.username + '!'

        var logoutButton = document.createElement('button')
        homeSection.appendChild(logoutButton)
        logoutButton.innerText = 'Log Out'
        logoutButton.type = 'submit'
        logoutButton.id = 'but'

        logoutButton.addEventListener('click', function (event) {
            event.preventDefault()

            loggedInUser = null

            homeSection.remove()

            body.appendChild(logInSection)
        })

        body.appendChild(homeSection)
    } catch (error) {

        logInPasswordInput.value = ''

        alert(error.message)

        console.error(error)
    }
})




//FUNCION QUE TIENE LUGAR AL PULSAR EL ANCHOR 'REGISTER'
loginResgisterAnchor.onclick = function (event) {
    event.preventDefault();

    loginForm.reset()
    logInSection.remove()

    //----- REGISTER SECTION -----  
    var registerSection = document.createElement('section')
    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
    registerSection.appendChild(registerTitle)

    //FORMULARIO DEL REGISTER
    var registerForm = document.createElement('form')
    registerSection.appendChild(registerForm)


    //REGISTER NAME LABEL 
    var registerNameLabel = document.createElement('label')
    registerForm.appendChild(registerNameLabel)
    registerNameLabel.htmlFor = 'name'
    registerNameLabel.innerText = 'Name'

    //REGISTER NAME INPUT 
    var registerNameInput = document.createElement('input')
    registerNameInput.required = true
    registerForm.appendChild(registerNameInput)
    registerNameInput.type = 'text'
    registerNameInput.id = 'Name'

    //REGISTER EMAIL LABEL 
    var registerEmailLabel = document.createElement('label')
    registerForm.appendChild(registerEmailLabel)
    registerEmailLabel.htmlFor = 'email'
    registerEmailLabel.innerText = 'E-mail'

    //REGISTER EMAIL INPUT 
    var registerEmailInput = document.createElement('input')
    registerEmailInput.required = true
    registerForm.appendChild(registerEmailInput)
    registerEmailInput.type = 'email'
    registerEmailInput.id = 'Email'
    // registerEmailInput.required

    //REGISTER USERNAME LABEL 
    var registerUsernameLabel = document.createElement('label')
    registerForm.appendChild(registerUsernameLabel)
    registerUsernameLabel.htmlFor = 'text'
    registerUsernameLabel.innerText = 'Username'

    //REGISTER USERNAME INPUT 
    var registerUsernameInput = document.createElement('input')
    registerUsernameInput.required = true
    registerForm.appendChild(registerUsernameInput)
    registerUsernameInput.type = 'text'
    registerUsernameInput.id = 'username'

    //REGISTER PASSWORD LABEL 
    var registerPasswordLabel = document.createElement('label')
    registerForm.appendChild(registerPasswordLabel)
    registerPasswordLabel.htmlFor = 'password'
    registerPasswordLabel.innerText = 'Password'

    //REGISTER PASSWORD INPUT 
    var registerPasswordInput = document.createElement('input')
    registerPasswordInput.required = true
    registerForm.appendChild(registerPasswordInput)
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'password'

    //REGISTER PASSWORD2 LABEL 
    var registerPasswordRepeatLabel = document.createElement('label')
    registerForm.appendChild(registerPasswordRepeatLabel)
    registerPasswordRepeatLabel.htmlFor = 'password'
    registerPasswordRepeatLabel.innerText = 'Repeat Password'

    //REGISTER PASSWORD2 INPUT 
    var registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.required = true
    registerForm.appendChild(registerPasswordRepeatInput)
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'password'


    //REGISTER SUBMIT BUTTON    
    var registerButton = document.createElement('button')
    registerForm.appendChild(registerButton)
    registerButton.innerText = 'Register'
    registerButton.type = 'submit'
    registerButton.id = 'but'

    //HACEMOS REGISTER DEL USER Y GUARDAMOS SUS DATOS
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

            body.appendChild(logInSection)
        } catch (error) {
            alert(error.message)

            console.log(error)
        }
    })


    //REGISTER LOGIN ANCHOR 
    var registerLoginAnchor = document.createElement('a')
    registerLoginAnchor.href = ''
    registerLoginAnchor.innerText = 'Login'
    registerForm.appendChild(registerLoginAnchor)

    body.appendChild(registerSection)

    //anchor hacia el login
    registerLoginAnchor.onclick = function (event) {
        event.preventDefault()

        registerSection.remove()
        body.appendChild(logInSection)
    }
}

var body = document.querySelector('body')
body.appendChild(loginSection)