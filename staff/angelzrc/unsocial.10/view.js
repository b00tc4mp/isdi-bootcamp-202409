/* function buildFormField(id, text, type) {
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text

    var input = document.createElement('input')
    input.type = type
    input.id = id

    return [label, input]
} */


function buildLoginSection() {
    var compo = new Compo(document.createElement('section'))

    /* var title = document.createElement('h2')
    title.innerText = 'Login'
    compo.container.appendChild(title) */
    var title = new Heading('Login', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)
/* 
    var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1]) */

    var usernameLabel = new Label('Username', 'username')
    form.add(usernameLabel)
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

/*     var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1]) */

    var passwordLabel = new Label('Password', 'password')
    form.add(passwordLabel)
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    var submitButton = new Button('Login', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.container.remove()

            var homeSection = buildHomeSection()

            body.add(homeSection)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })

  /*   var registerLink = document.createElement('a')
    registerLink.href = ''
    registerLink.innerText = 'Register'
    compo.container.appendChild(registerLink) */

    var registerLink = new Link('Register')
    compo.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        var registerSection = buildRegisterSection()

        body.add(registerSection)
    })

    return compo
}

function buildRegisterSection() {
    var compo = new Compo(document.createElement('section'))

   

    /* var title = document.createElement('h2')
    title.innerText = 'Register'
    compo.container.appendChild(title) */

    var title = new Heading('Register', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)

    /* var nameField = buildFormField('name', 'Name', 'text')
    form.container.appendChild(nameField[0])
    form.container.appendChild(nameField[1]) */
    var nameLabel = new Label('Name', 'name')
    form.add(nameLabel)
    var nameInput = new Input('text', 'name')
    form.add(nameInput)


    /* var emailField = buildFormField('email', 'E-mail', 'email')
    form.container.appendChild(emailField[0])
    form.container.appendChild(emailField[1]) */

    var emailLabel = new Label('E-mail', 'email')
    form.add(emailLabel)
    var emailInput = new Input('email', 'email')
    form.add(emailInput)


   /*  var usernameField = buildFormField('username', 'Username', 'text')
    form.container.appendChild(usernameField[0])
    form.container.appendChild(usernameField[1]) */

    var usernameLabel = new Label('Username', 'username')
    form.add(usernameLabel)
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

 /*    var passwordField = buildFormField('password', 'Password', 'password')
    form.container.appendChild(passwordField[0])
    form.container.appendChild(passwordField[1]) */

    var passwordLabel = new Label('Password', 'password')
    form.add(passwordLabel)
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

   /*  var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.container.appendChild(passwordRepeatField[0])
    form.container.appendChild(passwordRepeatField[1])
 */

    var passwordRepeatLabel = new Label('Password Repeat', 'password-repeat')
    form.add(passwordRepeatLabel)
    var passwordRepeatInput = new Input('password', 'password-repeat')
    form.add(passwordRepeatInput)
    
    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var passwordRepeat = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            compo.remove()

            body.add(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

  /*   var loginLink = document.createElement('a')
    loginLink.href = ''
    loginLink.innerText = 'Login'
    compo.container.appendChild(loginLink) */

    var loginLink = new Link('Login')
    compo.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()
        body.add(loginSection)
    })

    return compo
}

function buildHomeSection() {
    var compo = new Compo(document.createElement('section'))

    

    /* var title = document.createElement('h2')
    title.innerText = 'Home'
    compo.container.appendChild(title) */
    var title = new Heading('Home', 2)
    compo.add(title)

   /*  var userTitle = document.createElement('h3')
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
    compo.container.appendChild(userTitle)
 */
    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
    compo.add(userTitle)

    var logoutButton = new Button('Logout', 'button')
    compo.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.remove()

        body.add(loginSection)
    })

    return compo
}