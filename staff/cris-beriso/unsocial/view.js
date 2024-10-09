// creamos una función que permita crear todos los label e input de los forms de la app
function buildFormField(id, text, type) {
  var label = document.createElement('label')
  label.htmlFor = id
  label.innerText = text

  var input = document.createElement('input')
  input.type = type
  input.id = id

  return [label, input]
}

// creamos una función que permita crear los botones de la app
function buildButton(text, type) {
  var button = document.createElement('button')
  button.type = type
  button.innerText = text

  return button
}

// creamos una función para generar la sección de login
function buildLoginSection() {
  var compo = new Compo(document.createElement('section'))

  var section = compo.container
  section.className = 'login'

  var title = document.createElement('h2')
  title.innerText = 'Login'
  section.appendChild(title)

  var form = document.createElement('form')
  section.appendChild(form)
  form.className = 'login-form'

  var usernameField = buildFormField('username', 'Username', 'text')
  form.appendChild(usernameField[0])
  form.appendChild(usernameField[1])

  var passwordField = buildFormField('password', 'Password', 'password')
  form.appendChild(passwordField[0])
  form.appendChild(passwordField[1])

  var submitButton = buildButton('Login', 'submit')
  form.appendChild(submitButton)

  form.onsubmit = function (event) {
    event.preventDefault()

    var username = usernameField[1].value
    var password = passwordField[1].value

    try {
      loggedInUser = authenticateUser(username, password)

      form.reset()

      section.remove()

      var homeSection = buildHomeSection()

      body.add(homeSection)
    } catch (error) {
      passwordField[1].value = ''

      alert(error.message)

      console.error(error)
    }
  }
  //podría crearse otra función para los anchor?
  var registerLink = document.createElement('a')
  registerLink.href = ''
  registerLink.innerText = 'Register'
  section.appendChild(registerLink)

  registerLink.onclick = function (event) {
    event.preventDefault()

    section.remove()

    var registerSection = buildRegisterSection()

    body.add(registerSection)
  }

  return compo
}

// funcion para construir la sección de registro
function buildRegisterSection() {
  var compo = new Compo(document.createElement('section'))

  var section = compo.container

  var section = document.createElement('section')
  section.className = 'register'

  var title = document.createElement('h2')
  title.innerText = 'Register'
  section.appendChild(title)

  var form = document.createElement('form')
  section.appendChild(form)
  form.className = 'register-form'

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

  form.onsubmit = function (event) {
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

      body.add(loginSection)
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  var loginLink = document.createElement('a')
  loginLink.href = ''
  loginLink.innerText = 'Login'
  section.appendChild(loginLink)

  loginLink.onclick = function (event) {
    event.preventDefault()

    section.remove()
    body.add(loginSection)
  }

  return compo
}

// crear sección home

function buildHomeSection() {
  var compo = new Compo(document.createElement('section'))

  var section = compo.container

  var title = document.createElement('h2')
  title.innerText = 'Home'
  section.appendChild(title)

  var userTitle = document.createElement('h3')
  userTitle.innerText = 'Hello, ' + loggedInUser.name + '!'
  section.appendChild(userTitle)

  var logoutButton = buildButton('Logout', 'button')
  section.appendChild(logoutButton)

  logoutButton.onclick = function (event) {
    event.preventDefault()

    loggedInUser = null

    section.remove()

    body.add(loginSection)
  }

  return compo
}