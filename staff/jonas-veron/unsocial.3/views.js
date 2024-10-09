function buildFormField(id, text, type, placeholder){
    //create label username
    var label = document.createElement('label')
    label.htmlFor = id        
    label.innerText = text
    //create input username        
    var input = document.createElement('input')
    input.type = type
    input.id = id
    input.placeholder = placeholder

    return [label, input]
}

function buildButton(text, type){
    var button = document.createElement('button')
    button.type = type
    button.innerText = text

    return button
}

function buildLoginSection(){
    var compo = new Compo(document.createElement('section'))


    //create login section
    var section = compo.container
    section.classList = 'login'

    var title = document.createElement('h2')
    title.innerText = 'Login'
    section.appendChild(title)
    //create a form
    var form = document.createElement('form')
    section.appendChild(form)

    var usernameField = buildFormField('username', 'Username', 'text', 'Insert your username')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password', 'Insert your password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit')
    form.appendChild(submitButton)
    
//create a function to login
    form.addEventListener('submit', function(event){
        event.preventDefault()
    
        var username = usernameField[1].value
        var password = passwordField[1].value
    
        try{
            loggedInUser = autenticateUser(username, password)
            form.reset()

            section.remove()

            var homeSection = buildHomeSection()
    
            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = ''
    
            alert(error.message)
            
            console.log(error)
            }

        })


    //create anchor link in Login to Register
    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    section.appendChild(registerLink)

//create FUNCTION in login to REGISTER link
registerLink.addEventListener('click', function(event){
    event.preventDefault()
    section.remove()
    
    var registerSection = buildRegisterSection()
    body.add(registerSection)

    })    
    return compo
}


function buildRegisterSection(){
var compo = new Compo(document.createElement('section'))
//create new section to register
var section = compo.container
section.classList = 'register'
//create a title to register          
var title = document.createElement('h2')
title.innerText = 'Register'
section.appendChild(title)
//create a form
var form = document.createElement('form')
section.appendChild(form)

var nameField = buildFormField('name', 'Name', 'text', 'Insert yout name')
form.appendChild(nameField[0])
form.appendChild(nameField[1])

var emailField = buildFormField('email', 'E-mail', 'email', 'Insert yout email')
form.appendChild(emailField[0])
form.appendChild(emailField[1])

var usernameField = buildFormField('username', 'Username', 'text', 'Insert yout username')
form.appendChild(usernameField[0])
form.appendChild(usernameField[1])

var passwordField = buildFormField('password', 'Password', 'password', 'Insert yout password')
form.appendChild(passwordField[0])
form.appendChild(passwordField[1])

var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password', 'Insert yout password again')
form.appendChild(passwordRepeatField[0])
form.appendChild(passwordRepeatField[1])


//create a button for submit the registration

var submitButton = buildButton('Register', 'submit')
form.appendChild(submitButton)

//create FUNCTION to register 
form.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameField[1].value
    var email = emailField[1].value
    var username = usernameField[1].value
    var password = passwordField[1].value
    var passwordRepeat = passwordRepeatField[1].value

    try{
        registerUser(name, email, username, password, passwordRepeat)
    
        form.reset()
        section.remove()
        body.add(loginSection)
    }catch (error){
        alert(error.message)

        console.log(error)
        }
    })
//create a link in register to login
var loginLink = document.createElement('a')
loginLink.href = ''
loginLink.innerText = 'Login'
section.appendChild(loginLink)    

//create a function for a button Login          
loginLink.addEventListener('click', function(event){
    event.preventDefault()
    section.remove()
    body.add(loginSection)
    })

    return compo
}

function buildHomeSection(){
    var compo = new Compo(document.createElement('section'))
    var section = compo.container
    section.classList = 'home'
    var title = document.createElement('h2')
    title.innertext = 'Home'
    section.appendChild(title)
    var subtitle = document.createElement('h3')
    subtitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    section.appendChild(subtitle)

var logoutButton = buildButton('Logout', 'button')
section.appendChild(logoutButton)

//create a button for return to login

    section.appendChild(logoutButton)
    // loginForm.reset()

//create a function for return to login
    logoutButton.addEventListener('click', function(event){
        event.preventDefault()
        loggedInUser = null
        section.remove()
        body.add(loginSection)
    })

    return compo
}
