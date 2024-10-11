


/*En los script de data y logic se ponen en ese orden porque:
- logic depende de data, por lo cual data ha de cargar primero.
- la presentacion depende de logic y logic de data.
*/



// PRESENTATION ( Es la parte que maneja la parte visual)

var loggedInUser = null

var loginSection = document.createElement('section')

var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
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
loginForm.appendChild(loginSubmitButton)



loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var username = loginUsernameInput.value
    var password = loginPasswordInput.value

    try { // si la funcion authenticateUser funciona, sigue el try.
        loggedInUser = authenticateUser(username, password)

        loginForm.reset()

        loginSection.remove()

        var homeSection = document.createElement('section')

        var homeTitle = document.createElement('h2')
        homeTitle.innerText = 'Home'
        homeSection.appendChild(homeTitle)

        var homeUserTitle = document.createElement('h3')
        homeUserTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
        homeSection.appendChild(homeUserTitle)

        var homeLogoutButton = document.createElement('button')
        homeLogoutButton.innerText = 'Logout'
        homeSection.appendChild(homeLogoutButton)

        homeLogoutButton.addEventListener('click', function (event) {
            event.preventDefault()

            loggedInUser = null

            homeSection.remove()

            body.appendChild(loginSection)
        })

        body.appendChild(homeSection)
    } catch (error) { // si el try no està bien lanzamos un error.
        alert(error.message) // y nos muestra el error.

        console.log.error(error) // ponemos el console para que muestre en la consola donde esta el error.
    }
})

var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginSection.remove()

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
    registerPasswordRepeatLabel.innerText = 'Repeat Password'
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
        var passwordRepeat = registerPasswordRepeatInput.value

        /* el try catch no solo captura un error (como el return), tambien hace algo con el. */

        try { // si se cumple lo de abajo sigue.
            registerUser(name, email, username, password, passwordRepeat)

            registerForm.reset()

            registerSection.remove()

            body.appendChild(loginSection)
        } catch (error) { // si no se cumple de lo arriba se rompe y viene aqui.
            alert(error.message) // y nos muestra el error.

            console.log.error(error)  // ponemos el console para que muestre en la consola donde esta el error.

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