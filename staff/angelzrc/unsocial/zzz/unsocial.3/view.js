//create login section
function buildFormField(id, text, type) {
    var label = document.createElement('Label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id

    return [label, input]
}

function buildButton(text, type) {
    var button = document.createElement('button')
    button.type = type
    button.innerText = text

    return button
}

function buildLoginSection() {
    var section = documente.createElement('section')

    var title = document.createElement('h2')
    title.innerText + 'Login'
    section.sppendChild(title)

    var form = document.createElement('form')
    section.appendChild(form)

    var usernameField = buildFormField('username', 'Username', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit')
    form.appendChild(submitButton)

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var username = usernameField[1].value
        var password = passwordField[1].value

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            section.remove()

            var homeSection = buildHomeSection()

            body.appendChild(homeSection)
        } catch (error) {
            passwordField[1].value = ''

            alert(error.message)

            console.error(error)
        }
    })

    function buildRegisterSection() {
        var section = document.createElement('section')

        var title = document.createElement('h2')
        title.innerText = 'Register'
        section.appendChild(title)

        var form = document.createElement('form')
        section.appendChild(form)

        var nameField = buildFormField('name', 'Name', 'text')
        form.appendChild(nameField[0])
        form.appendChild(nameField[1])

        var emailField = buildFormField('email', 'E-mail', 'email')
        form.appendChild(emailField[0])
        form.appendChild(emailField[1])

        var usernameField = buildFormField('username', 'Username', 'text')
        form.appendChild(usernameField[0])
        form.appendChild(usernameField[1])

        var passwordField = buildFormField('password', 'Password', 'password')
        form.appendChild(passwordField[0])
        form.appendChild(passwordField[1])

        var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
        form.appendChild(passwordRepeatField[0])
        form.appendChild(passwordRepeatField[1])

        var submitButton = buildButton('Register', 'submit')
        form.appendChild(submitButton)

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            var name = nameField[1].value
            var email = emailField[1].value
            var username = usernameField[1].value
            var password = passwordField[1].value
            var passwordRepeat = passwordRepeatField[1].value

            try {
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                section.remove()

                body.appendChild(loginSection)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })

        var loginLink = document.createElement('a')
        loginLink.href = ''
        loginLink.innerText = 'Login'
        section.appendChild(loginLink)

        loginLink.addEventListener('click', function (event) {
            event.preventDefault()

            section.remove()
            body.appendChild(loginSection)
        })

        return section


    }
}
function buildHomeSection() {
    var section = document.createElement('section')

    var title = document.createElement('h2')
    title.innerText = 'Home'
    section.appendChild(title)

    var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    section.appendChild(userTitle)

    var logoutButton = buildButton('Logout', 'button')
    section.appendChild(logoutButton)

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        section.remove()

        body.appendChild(loginSection)
    })

    return section

}

/*  var registerLink = document.createElement('a')
 registerLink.href = ''
 registerLink.innerText = 'Register'
 section.appendChild(registerLink)

 registerLink.addEventListener('click', function (event) {
     event.preventDefault()

     section.remove()

     var registerSection = buildRegisterSection()

     body.appendChild(registerSection)
 })

 return section
}


var loginSection = document.createElement('section')
loginSection.classList = 'login'
var loginTitle = document.createElement('h2')
loginTitle.innerText = 'Login'
loginSection.appendChild(loginTitle)
//create a form
var loginForm = document.createElement('form')
loginSection.appendChild(loginForm)
//create label username     
var loginUsernameLabel = document.createElement('label')
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.innerText = 'Username'
loginForm.appendChild(loginUsernameLabel)
//create input username        
var loginUsernameInput = document.createElement('input')
loginUsernameInput.type = 'text'
loginUsernameInput.id = 'username'
loginUsernameInput.placeholder = 'Insert your username'
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
loginPasswordInput.placeholder = 'Insert your password'
loginForm.appendChild(loginPasswordInput)
//create button in login
var loginSubmitButton = document.createElement('button')
loginSubmitButton.type = 'submit'
loginSubmitButton.innerText = 'Login'
loginForm.appendChild(loginSubmitButton)

//create a function to login
loginForm.addEventListener('submit', function (event) {
 event.preventDefault()

 var username = loginUsernameInput.value
 var password = loginPasswordInput.value

 try {
     loggedInUser = autenticateUser(username, password)
     loginForm.reset()

     //create a Home Section

     loginSection.remove()
     var homeSection = document.createElement('section')
     homeSection.classList = 'home'
     var homeTitle = document.createElement('h2')
     homeTitle.innertext = 'Home'
     homeSection.appendChild(homeTitle)
     var homeSubtitle = document.createElement('h3')
     homeSubtitle.innerText = 'Hello, ' + loggedInUser.name + '!'
     homeSection.appendChild(homeSubtitle)

     //create a button for return to login
     var logoutSubmitButton = document.createElement('button')
     logoutSubmitButton.type = 'submit'
     logoutSubmitButton.innerText = 'Logout'
     homeSection.appendChild(logoutSubmitButton)
     loginForm.reset()

     //create a function for return to login
     logoutSubmitButton.addEventListener('click', function (event) {
         event.preventDefault()
         loggedInUser = null
         homeSection.remove()
         body.appendChild(loginSection)
     })
     body.appendChild(homeSection)
 } catch (error) {
     loginPasswordInput.value = ''

     alert(error.message)
     console.log(error)
 }
})



//create anchor link in Login to Register
var loginRegisterLink = document.createElement('a')
loginRegisterLink.href = ''
loginRegisterLink.innerText = 'Register'
loginSection.appendChild(loginRegisterLink)

//create FUNCTION in login to REGISTER link
loginRegisterLink.addEventListener('click', function (event) {
 event.preventDefault()
 loginSection.remove()

 //create new section to register
 var registerSection = document.createElement('section')
 registerSection.classList = 'register'
 //create a title to register          
 var registerTitle = document.createElement('h2')
 registerTitle.innerText = 'Register'
 registerSection.appendChild(registerTitle)
 //create a form
 var registerForm = document.createElement('form')
 registerSection.appendChild(registerForm)
 //create a label for name
 var registerNameLabel = document.createElement('label')
 registerNameLabel.htmlFor = 'nameR'
 registerNameLabel.innerText = 'Name'
 registerForm.appendChild(registerNameLabel)
 //create a input for a name
 var registerNameInput = document.createElement('input')
 registerNameInput.type = 'text'
 registerNameInput.id = 'name'
 registerNameInput.placeholder = 'Insert your name'
 registerForm.appendChild(registerNameInput)
 //create a label for email
 var registerEmailLabel = document.createElement('label')
 registerEmailLabel.htmlFor = 'email'
 registerEmailLabel.innerText = 'Email'
 registerForm.appendChild(registerEmailLabel)
 //create a input for email
 var registerEmailInput = document.createElement('input')
 registerEmailInput.type = 'email'
 registerEmailInput.id = 'email'
 registerEmailInput.placeholder = 'Insert your E-mail'
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
 registerUsernameInput.placeholder = 'Insert your username'
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
 registerPasswordInput.placeholder = 'Insert your password'
 registerForm.appendChild(registerPasswordInput)
 //create a label for passwordRepeat          
 var registerPasswordRepeatLabel = document.createElement('label')
 registerPasswordRepeatLabel.htmlFor = 'password-repeat'
 registerPasswordRepeatLabel.innerText = 'Password Repeat'
 registerForm.appendChild(registerPasswordRepeatLabel)
 //create a input for password
 registerPasswordRepeatInput = document.createElement('input')
 registerPasswordRepeatInput.type = 'password'
 registerPasswordRepeatInput.id = 'password-repeat'
 registerPasswordRepeatInput.placeholder = 'Insert your password again'
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
 //create FUNCTION to register 
 registerForm.addEventListener('submit', function (event) {
     event.preventDefault()
     var nameInput = registerNameInput.value
     var emailInput = registerEmailInput.value
     var usernameInput = registerUsernameInput.value
     var passwordInput = registerPasswordInput.value
     var passwordRepeatInput = registerPasswordRepeatInput.value

     try {
         registerUser(nameInput, emailInput, usernameInput, passwordInput, passwordRepeatInput)

         registerForm.reset()
         registerSection.remove()
         body.appendChild(loginSection)
     } catch (error) {
         alert(error.message)

         console.log(error)
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
*/
