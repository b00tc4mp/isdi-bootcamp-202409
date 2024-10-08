//Declaramos un array de usuarios para los tests

var loggedUser = null;

//function showLogin() {
//    console.log('entro en el showLogin')

//FORMULARIO DE LOGIN
var loginSection = document.createElement('section')
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)

var introText = document.createElement('p')
introText.innerText = 'Log in to acces your account'
loginSection.appendChild(introText)

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
loginForm.appendChild(loginSubmitButton)

var registerText = document.createElement('p')
registerText.innerText = "Don't have an account? Create your account below."
registerText.className = 'registerText'
loginSection.appendChild(registerText)


var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = '> Register <'
loginSection.appendChild(loginRegisterLink)

//}



//  showLogin()

//SECTION REGISTER
//-------------------
function showRegister() {
    var registerSection = document.createElement('section')
    var registerTitle = document.createElement('h2')
    registerTitle.innerText = 'Register'
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
    registerNameInput.required = true
    registerForm.appendChild(registerNameInput)

    var registerEmailLabel = document.createElement('label')
    registerEmailLabel.htmlFor = 'email'
    registerEmailLabel.innerText = 'Your email'
    registerForm.appendChild(registerEmailLabel)

    var registerEmailInput = document.createElement('input')
    registerEmailInput.type = 'text'
    registerEmailInput.id = 'email'
    registerEmailInput.required = true
    registerForm.appendChild(registerEmailInput)

    var registerUserNameLabel = document.createElement('label')
    registerUserNameLabel.htmlFor = 'username'
    registerUserNameLabel.innerText = 'Username'
    registerForm.appendChild(registerUserNameLabel)

    var registerUserNameInput = document.createElement('input')
    registerUserNameInput.type = 'text'
    registerUserNameInput.id = 'username'
    registerUserNameInput.required = true
    registerForm.appendChild(registerUserNameInput)

    //Campo para el password
    var registerPasswordLabel = document.createElement('label')
    registerPasswordLabel.htmlFor = 'password'
    registerPasswordLabel.innerText = 'Password'
    registerForm.appendChild(registerPasswordLabel)

    var registerPasswordInput = document.createElement('input')
    registerPasswordInput.type = 'password'
    registerPasswordInput.id = 'password'
    registerPasswordInput.required = true
    registerForm.appendChild(registerPasswordInput)

    //Campo para el check password
    var checkRegisterPasswordLabel = document.createElement('label')
    checkRegisterPasswordLabel.htmlFor = 'checkpassword'
    checkRegisterPasswordLabel.innerText = 'Repeat password'
    registerForm.appendChild(checkRegisterPasswordLabel)

    var checkRegisterPasswordInput = document.createElement('input')
    checkRegisterPasswordInput.type = 'password'
    checkRegisterPasswordInput.id = 'checkpassword'
    registerForm.appendChild(checkRegisterPasswordInput)


    var registerSubmitButton = document.createElement('button')
    registerSubmitButton.type = 'submit'
    registerSubmitButton.innerText = 'Register now'
    registerForm.appendChild(registerSubmitButton)

    var registerLoginLink = document.createElement('a')
    registerLoginLink.href = ''
    registerLoginLink.innerText = 'Login'
    registerSection.appendChild(registerLoginLink)

    body.appendChild(registerSection)

    //Evento click del enlace de la página de registro a login
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault()
        registerSection.remove()
        body.appendChild(loginSection)
    })

    //Evento submit del botón register
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Pulso en el botón registrar')

        var name = registerNameInput.value
        var email = registerEmailInput.value
        var username = registerUserNameInput.value
        var password = registerPasswordInput.value
        var checkPassword = checkRegisterPasswordInput.value
        var error = false

        try {
            registerUser(name, email, username, password, checkPassword)

            registerForm.reset();
            registerSection.remove();
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

    var homeSection = document.createElement('section')
    var homeTitle = document.createElement('h2')
    homeTitle.innerText = 'Home'
    homeSection.appendChild(homeTitle)

    var homeWelcome = document.createElement('h3')
    homeWelcome.innerText = 'Hello ' + loggedUser.name
    homeSection.appendChild(homeWelcome)

    var logoutClickButton = document.createElement('button')
    //logoutClickButton.type = 'click'
    logoutClickButton.innerText = 'Logout'
    homeSection.appendChild(logoutClickButton)

    body.appendChild(homeSection)

    //Evento click del botón logout
    logoutClickButton.addEventListener('click', function () {
        loggedUser = null;
        homeSection.remove();
        body.appendChild(loginSection)
    })
}


//EVENTOS DE LOS ENLACES Y BOTONES
//--------------------------------

//Evento click del enlace registro
loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()
    loginSection.remove()
    loginForm.reset()
    showRegister()
})

//Evento submit del botón login 
loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('Click en botón login')

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try {

        loggedUser = authenticateUser(username, password)
        console.log('usuario validado!')
        console.log("Entro en la zona logueada")
        loginForm.reset()
        loginSection.remove()
        showHome()

    } catch (error) {
        loginPasswordInput.value = ''
        alert(error.message)
        console.error(error)
    }

})

var body = document.querySelector('body')
body.appendChild(loginSection)