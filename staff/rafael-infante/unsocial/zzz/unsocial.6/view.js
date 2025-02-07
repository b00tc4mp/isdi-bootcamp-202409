function buildFormField(id, text, type, placeholder) {
  var label = document.createElement('label')
  label.htmlFor = id
  label.innerText = text

  var input = document.createElement('input')
  input.type = type
  input.id = id
  input.placeholder = placeholder
  input.required = true

  return [label, input]
}

function buildButton(id, type, text) {
  var compo = new Compo(document.createElement('button'))
  compo.container.id = id
  compo.container.type = type
  compo.container.innerText = text

  return compo
}

function buildForm(className) {
  var compo = new Compo(document.createElement('form'))
  compo.container.classList.add(className)
  return compo
}

function buildLoginSection() {

  var compo = new Compo(document.createElement('section'))
  compo.container.classList.add('section-container')

  var paragraph = document.createElement('p')
  paragraph.innerText = 'Welcome !'
  compo.container.appendChild(paragraph)

  var title = document.createElement('h2')
  title.innerText = 'Sign in to unSocial'
  compo.container.appendChild(title)

  var text = document.createElement('h4')
  text.innerText = 'Write username and password to access'
  compo.container.appendChild(text)

  var form = buildForm('form-container')
  compo.add(form)

  var usernameField = buildFormField('login-user', 'User name', 'text', 'Enter your user name')
  form.container.appendChild(usernameField[0])
  form.container.appendChild(usernameField[1])

  var passwordField = buildFormField('login-password', 'Password', 'password', 'Enter your password')
  form.container.appendChild(passwordField[0])
  form.container.appendChild(passwordField[1])

  var submitButton = buildButton('btn-login', 'submit', 'Login')
  form.add(submitButton)

  var anchorText = document.createElement('p')
  anchorText.innerText = "Don't have an account? "
  compo.container.appendChild(anchorText)

  var registerLink = document.createElement('a')
  registerLink.innerText = "Register"
  anchorText.appendChild(registerLink)

  // var passwordInputContainer = document.createElement('div')
  // var passwordIcon = document.createElement('i')
  // var passwordInput = document.createElement('input')
  //form.appendChild(passwordInputContainer)
  //passwordInputContainer.classList.add('password-container')
  //passwordInputContainer.appendChild(passwordInput)
  //passwordInputContainer.appendChild(passwordIcon)
  // passwordIcon.classList.add('far')
  // passwordIcon.classList.add('fa-eye')
  // passwordIcon.id = 'icon'
  // var isVisible = false
  // passwordIcon.addEventListener('click', function (event) {
  //   passwordIcon.classList.toggle('fa-eye-slash')
  //   if (!isVisible) {
  //     passwordInput.type = 'text'
  //     isVisible = true
  //   } else {
  //     passwordInput.type = 'password'
  //     isVisible = false
  //   }
  // })

  // Send user to register section when clicking on register link
  registerLink.addEventListener('click', function (event) {
    event.preventDefault()
    compo.container.remove()
    var registerSection = buildRegisterSection()
    body.add(registerSection)
  })
  // actions when submitting the login Form
  form.container.addEventListener('submit', function (event) {
    event.preventDefault()

    var username = usernameField[1].value
    var password = passwordField[1].value

    try {
      loggedUser = authenticateUser(username, password)
      form.container.reset()
      compo.container.remove()
      var homeSection = buildHomeSection()
      body.add(homeSection)
    }
    catch (error) {
      passwordField[1].value = ''
      alert(error.message)
      console.error(error)
    }
  })

  return compo
}

function buildRegisterSection() {
  var compo = new Compo(document.createElement('section'))
  compo.container.classList.add('section-container')

  var title = document.createElement('h2')
  title.id = 'register-title'
  title.innerText = 'Register to unSocial'
  compo.container.appendChild(title)

  var form = buildForm('form-container')

  compo.add(form)

  var nameField = buildFormField('name', 'Name', 'text', 'Enter your name')
  form.container.appendChild(nameField[0])
  form.container.appendChild(nameField[1])

  var emailField = buildFormField('email', 'e-mail', 'email', 'Enter your email')
  form.container.appendChild(emailField[0])
  form.container.appendChild(emailField[1])

  var usernameField = buildFormField('username', 'User name', 'text', 'Enter your user name')
  form.container.appendChild(usernameField[0])
  form.container.appendChild(usernameField[1])

  var passwordField = buildFormField('password', 'Password', 'password', 'Enter your password')
  form.container.appendChild(passwordField[0])
  form.container.appendChild(passwordField[1])

  var confirmPasswordField = buildFormField('confirm-password', 'Confirm Password', 'password', 'Confirm your password')
  form.container.appendChild(confirmPasswordField[0])
  form.container.appendChild(confirmPasswordField[1])

  var registerButton = buildButton('btn-register', 'submit', 'Register')
  form.add(registerButton)

  var registerAnchorText = document.createElement('p')
  registerAnchorText.innerText = 'Already have an account? '
  compo.container.appendChild(registerAnchorText)

  var registerLoginLink = document.createElement('a')
  registerLoginLink.id = 'loginAnchor'
  registerLoginLink.innerText = 'Login'
  registerAnchorText.appendChild(registerLoginLink)

  registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault();
    compo.container.remove()
    body.add(loginSection)
  })
  // Save data of new user when clicking on register button
  form.container.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameField[1].value
    var email = emailField[1].value
    var username = usernameField[1].value
    var password = passwordField[1].value
    var confirmPassword = confirmPasswordField[1].value

    try {
      registerUser(name, email, username, password, confirmPassword)
      form.container.reset()
      compo.container.remove()
      body.add(loginSection)
    }
    catch (error) {
      alert(error.message)
      console.error(error)
    }
  })

  return compo
}

function buildHomeSection() {
  var compo = new Compo(document.createElement('section'))

  compo.container.id = 'home'
  compo.container.classList.add('section-container')

  var title = document.createElement('h2')
  title.innerText = 'Home'
  compo.container.appendChild(title)

  var text = document.createElement('h3')
  text.innerText = 'Hello, ' + loggedUser.name + '!'
  compo.container.appendChild(text)

  var image = document.createElement('img')
  image.style.height = '300px'
  image.src = '/staff/rafael-infante/unsocial/images/boy.png'
  compo.container.appendChild(image)

  var logoutButton = buildButton('btn.logout', 'submit', 'Logout')
  compo.add(logoutButton)

  // Functionality of logout button
  logoutButton.container.addEventListener('click', function (event) {
    var condition = prompt('Are you sure? (y/n)')
    if (condition === 'y') {
      event.preventDefault()
      loggedUser = null
      compo.container.remove()
      body.add(loginSection)
    }
  })
  return compo
}