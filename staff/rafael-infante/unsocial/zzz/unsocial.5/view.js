function buildFormField(id, text, type, placeholder) {
  var label = document.createElement('label')
  label.htmlFor = id
  label.innertext = text

  var input = document.createElement('input')
  input.type = type
  input.id = id
  input.placeholder = placeholder
  input.required = true

  return [label, input]
}

function buildLoginSection() {

  var compo = new Compo(document.createElement('section'))

  var section = compo.container

  var paragraph = document.createElement('p')
  var title = document.createElement('h2')
  var text = document.createElement('h4')
  var form = document.createElement('form')

  var usernameLabel = document.createElement('label')
  var usernameInput = document.createElement('input')
  var passwordLabel = document.createElement('label')
  var passwordInputContainer = document.createElement('div')
  var passwordIcon = document.createElement('i')
  var passwordInput = document.createElement('input')
  var button = document.createElement('button')
  var anchorText = document.createElement('p')
  var registerLink = document.createElement('a')

  paragraph.innerText = 'Welcome !'
  title.innerText = 'Sign in to unSocial'
  text.innerText = 'Write username and password to access'
  section.appendChild(paragraph)
  section.appendChild(title)
  section.appendChild(text)
  section.classList.add('section-container')
  section.appendChild(form)
  form.classList.add('form-container')
  form.appendChild(usernameLabel)
  form.appendChild(usernameInput)
  usernameLabel.htmlFor = 'login-user'
  usernameLabel.innerText = 'User name'
  usernameInput.id = 'login-user'
  usernameInput.placeholder = 'Enter your user name'
  usernameInput.required = true
  form.appendChild(passwordLabel)
  form.appendChild(passwordInputContainer)
  passwordInputContainer.classList.add('password-container')
  passwordInputContainer.appendChild(passwordInput)
  passwordLabel.htmlFor = 'login-password'
  passwordLabel.innerText = 'Password'
  passwordLabel.id = 'login-password'
  passwordInput.type = 'password'
  passwordInput.id = 'password'
  passwordInput.placeholder = 'Enter your Password'
  passwordInput.required = true
  passwordInputContainer.appendChild(passwordIcon)
  passwordIcon.classList.add('far')
  passwordIcon.classList.add('fa-eye')
  passwordIcon.id = 'icon'
  form.appendChild(button)
  button.id = 'btn-login'
  button.type = 'submit'
  button.innerText = 'Login'
  anchorText.innerText = "Don't have an account? "
  section.appendChild(anchorText)
  registerLink.innerText = "Register"
  anchorText.appendChild(registerLink)

  var isVisible = false
  passwordIcon.addEventListener('click', function (event) {
    passwordIcon.classList.toggle('fa-eye-slash')
    if (!isVisible) {
      passwordInput.type = 'text'
      isVisible = true
    } else {
      passwordInput.type = 'password'
      isVisible = false
    }
  })

  // Send user to register section when clicking on register link
  registerLink.addEventListener('click', function (event) {
    event.preventDefault()
    section.remove()
    var registerSection = buildRegisterSection()
    body.add(registerSection)
  })
  // actions when submitting the login Form
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    var loginUsername = usernameInput.value
    var loginPassword = passwordInput.value

    try {
      loggedUser = authenticateUser(loginUsername, loginPassword)
      form.reset()
      section.remove()
      var homeSection = buildHomeSection()
      body.add(homeSection)
    }
    catch (error) {
      passwordInput.value = ''
      alert(error.message)
      console.error(error)
    }
  })

  return compo
}

function buildRegisterSection() {
  var compo = new Compo(document.createElement('section'))
  var section = compo.container

  var title = document.createElement('h2')
  var form = document.createElement('form')
  var nameField = buildFormField('name', 'Name', 'text', 'Enter your name')
  var emailField = buildFormField('email', 'e-mail', 'email', 'Enter your email')
  var usernameField = buildFormField('username', 'User name', 'text', 'Enter your user name')
  var passwordField = buildFormField('password', 'Password', 'password', 'Enter your password')
  var confirmPasswordField = buildFormField('confirm-password', 'Confirm Password', 'password', 'Confirm your password')
  var registerButton = document.createElement('button')

  section.classList.add('section-container')
  title.id = 'register-title'
  title.innerText = 'Register to unSocial'
  section.appendChild(title)
  form.classList.add('form-container')
  section.appendChild(form)
  form.appendChild(nameField[0])
  form.appendChild(nameField[1])
  form.appendChild(emailField[0])
  form.appendChild(emailField[1])
  form.appendChild(usernameField[0])
  form.appendChild(usernameField[1])
  form.appendChild(passwordField[0])
  form.appendChild(passwordField[1])
  form.appendChild(confirmPasswordField[0])
  form.appendChild(confirmPasswordField[1])

  registerButton.id = 'btn-register'
  registerButton.type = 'submit'
  registerButton.innerText = 'Register'
  form.appendChild(registerButton)

  var registerAnchorText = document.createElement('p')
  registerAnchorText.innerText = 'Already have an account? '
  section.appendChild(registerAnchorText)
  var registerLoginLink = document.createElement('a')
  registerLoginLink.id = 'loginAnchor'
  registerLoginLink.innerText = 'Login'
  registerAnchorText.appendChild(registerLoginLink)

  registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault();
    section.remove()
    body.add(loginSection)
  })
  // Save data of new user when clicking on register button
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameField[1].value
    var email = emailField[1].value
    var username = usernameField[1].value
    var password = passwordField[1].value
    var confirmPassword = confirmPasswordField[1].value

    try {
      registerUser(name, email, username, password, confirmPassword)
      form.reset()
      section.remove()
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

  var section = compo.container

  var title = document.createElement('h2')
  var text = document.createElement('h3')
  var image = document.createElement('img')
  var logoutButton = document.createElement('button')
  section.appendChild(title)
  section.appendChild(text)
  section.appendChild(image)
  section.appendChild(logoutButton)
  section.id = 'home'
  section.classList.add('section-container')
  title.innerText = 'Home'
  text.innerText = 'Hello, ' + loggedUser.name + '!'
  image.style.height = '300px'
  image.src = '/staff/rafael-infante/unsocial/images/boy.png'
  logoutButton.id = 'btn-logout'
  logoutButton.innerText = 'Logout'
  // Functionality of logout button
  logoutButton.addEventListener('click', function (event) {
    var condition = prompt('Are you sure? (y/n)')
    if (condition === 'y') {
      event.preventDefault()
      loggedUser = null
      section.remove()
      body.add(loginSection)
    }
  })
  return compo
}