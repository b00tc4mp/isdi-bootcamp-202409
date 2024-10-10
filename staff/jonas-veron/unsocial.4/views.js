function buildFormField(id, text, type, placeholder){
    var label = document.createElement('label')
    label.htmlFor = id        
    label.innerText = text       

    var input = document.createElement('input')
    input.type = type
    input.id = id
    input.placeholder = placeholder

    return [label, input]
}

function buildForm(){
    var compo = new Compo(document.createElement('form'))

    return compo
}

function buildButton(text, type){
    var compo = new Compo(document.createElement('button'))
    
    compo.container.type = type
    compo.container.innerText = text

    return compo
}

function buildLoginSection(){
    var compo = new Compo(document.createElement('section'))
    compo.container.classList = 'login'

    var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title)

    var form = buildForm()
    compo.add(form)

    var usernameField = buildFormField('username', 'Username', 'text', 'Insert your username')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password', 'Insert your password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1])

    var submitButton = buildButton('Login', 'submit')
    form.add(submitButton)
    

    form.container.addEventListener('submit', function(event){
        event.preventDefault()
    
        var username = usernameField[1].value
        var password = passwordField[1].value
    
        try{
            loggedInUser = autenticateUser(username, password)
            form.container.reset()

            compo.container.remove()

            var homeSection = buildHomeSection()
    
            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = ''
    
            alert(error.message)
            
            console.error(error)
            }

        })



    var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    compo.container.appendChild(registerLink)


registerLink.addEventListener('click', function(event){
    event.preventDefault()

    compo.container.remove()
    
    var registerSection = buildRegisterSection()
    body.add(registerSection)

    })    
    return compo
}


function buildRegisterSection(){
var compo = new Compo(document.createElement('section'))

compo.container.classList = 'register'

var title = document.createElement('h2')
title.innerText = 'Register'
compo.container.appendChild(title)

var form = buildForm()
compo.add(form)

var nameField = buildFormField('name', 'Name', 'text', 'Insert yout name')
form.container.appendChild(nameField[0])
form.container.appendChild(nameField[1])

var emailField = buildFormField('email', 'E-mail', 'email', 'Insert yout email')
form.container.appendChild(emailField[0])
form.container.appendChild(emailField[1])

var usernameField = buildFormField('username', 'Username', 'text', 'Insert yout username')
form.container.appendChild(usernameField[0])
form.container.appendChild(usernameField[1])

var passwordField = buildFormField('password', 'Password', 'password', 'Insert yout password')
form.container.appendChild(passwordField[0])
form.container.appendChild(passwordField[1])

var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password', 'Insert yout password again')
form.container.appendChild(passwordRepeatField[0])
form.container.appendChild(passwordRepeatField[1])



var submitButton = buildButton('Register', 'submit')
form.container.appendChild(submitButton.container)


form.container.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameField[1].value
    var email = emailField[1].value
    var username = usernameField[1].value
    var password = passwordField[1].value
    var passwordRepeat = passwordRepeatField[1].value

    try{
        registerUser(name, email, username, password, passwordRepeat)
    
        form.container.reset()

        compo.container.remove()

        body.add(loginSection)
    }catch (error){
        alert(error.message)

        console.error(error)
        }
    })
//create a link in register to login
var loginLink = document.createElement('a')
loginLink.href = ''
loginLink.innerText = 'Login'
compo.container.appendChild(loginLink)    

//create a function for a button Login          
loginLink.addEventListener('click', function(event){
    event.preventDefault()

    compo.container.remove()
    body.add(loginSection)
    })

    return compo
}

function buildHomeSection(){
    var compo = new Compo(document.createElement('section'))
    compo.container.classList = 'home'

    var title = document.createElement('h2')
    title.innertext = 'Home'
    compo.container.appendChild(title)

    var subtitle = document.createElement('h3')
    subtitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(subtitle)

var logoutButton = buildButton('Logout', 'button')
compo.add(logoutButton)

    logoutButton.container.addEventListener('click', function(event){
        event.preventDefault()

        loggedInUser = null

        compo.container.remove()

        body.add(loginSection)
    })

    return compo
}
