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

  var loginSection = document.createElement('section')
  var loginParagraph = document.createElement('p')
  var loginTitle = document.createElement('h2')
  var loginText = document.createElement('h4')
  var loginForm = document.createElement('form')
  var loginUsernameLabel = document.createElement('label')
  var loginUsernameInput = document.createElement('input')
  var loginPasswordLabel = document.createElement('label')
  var loginPasswordInputContainer = document.createElement('div')
  var loginPasswordIcon = document.createElement('i')
  var loginPasswordInput = document.createElement('input')
  var loginButton = document.createElement('button')
  var loginAnchorText = document.createElement('p')
  var registerLink = document.createElement('a')

  loginParagraph.innerText = 'Welcome !'
  loginTitle.innerText = 'Sign in to unSocial'
  loginText.innerText = 'Write username and password to access'
  loginSection.appendChild(loginParagraph)
  loginSection.appendChild(loginTitle)
  loginSection.appendChild(loginText)
  loginSection.classList.add('section-container')
  loginSection.appendChild(loginForm)
  loginForm.classList.add('form-container')
  loginForm.appendChild(loginUsernameLabel)
  loginForm.appendChild(loginUsernameInput)
  loginUsernameLabel.htmlFor = 'login-user'
  loginUsernameLabel.innerText = 'User name'
  loginUsernameInput.id = 'login-user'
  loginUsernameInput.placeholder = 'Enter your user name'
  loginUsernameInput.required = true
  loginForm.appendChild(loginPasswordLabel)
  loginForm.appendChild(loginPasswordInputContainer)
  loginPasswordInputContainer.classList.add('password-container')
  loginPasswordInputContainer.appendChild(loginPasswordInput)
  loginPasswordLabel.htmlFor = 'login-password'
  loginPasswordLabel.innerText = 'Password'
  loginPasswordLabel.id = 'login-password'
  loginPasswordInput.type = 'password'
  loginPasswordInput.id = 'password'
  loginPasswordInput.placeholder = 'Enter your Password'
  loginPasswordInput.required = true
  loginPasswordInputContainer.appendChild(loginPasswordIcon)
  loginPasswordIcon.classList.add('far')
  loginPasswordIcon.classList.add('fa-eye')
  loginPasswordIcon.id = 'icon'
  loginForm.appendChild(loginButton)
  loginButton.id = 'btn-login'
  loginButton.type = 'submit'
  loginButton.innerText = 'Login'
  loginAnchorText.innerText = "Don't have an account? "
  loginSection.appendChild(loginAnchorText)
  registerLink.innerText = "Register"
  loginAnchorText.appendChild(registerLink)

  var isVisible = false
  loginPasswordIcon.addEventListener('click', function (event) {
    loginPasswordIcon.classList.toggle('fa-eye-slash')
    if (!isVisible) {
      loginPasswordInput.type = 'text'
      isVisible = true
    } else {
      loginPasswordInput.type = 'password'
      isVisible = false
    }
  })

  // Send user to register section when clicking on register link
  registerLink.addEventListener('click', function (event) {
    event.preventDefault()
    loginSection.remove()
    var registerSection = buildRegisterSection()
    body.appendChild(registerSection)
  })
  // actions when submitting the login Form
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var loginUsername = loginUsernameInput.value
    var loginPassword = loginPasswordInput.value

    try {
      loggedUser = authenticateUser(loginUsername, loginPassword)
      loginForm.reset()
      loginSection.remove()
      buildHomeSection()
    }
    catch (error) {
      loginPasswordInput.value = ''
      alert(error.message)
      console.error(error)
    }
  })

  return loginSection
}

function buildRegisterSection() {
  var registerSection = document.createElement('section')
  var registerTitle = document.createElement('h2')
  var registerForm = document.createElement('form')
  var nameField = buildFormField('name', 'Name', 'text', 'Enter your name')
  var emailField = buildFormField('email', 'e-mail', 'email', 'Enter your email')
  var usernameField = buildFormField('username', 'User name', 'text', 'Enter your user name')
  var passwordField = buildFormField('password', 'Password', 'password', 'Enter your password')
  var confirmPasswordField = buildFormField('confirm-password', 'Confirm Password', 'password', 'Confirm your password')
  var registerButton = document.createElement('button')

  registerSection.classList.add('section-container')
  registerTitle.id = 'register-title'
  registerTitle.innerText = 'Register to unSocial'
  registerSection.appendChild(registerTitle)
  registerForm.classList.add('form-container')
  registerSection.appendChild(registerForm)
  registerForm.appendChild(nameField[0])
  registerForm.appendChild(nameField[1])
  registerForm.appendChild(emailField[0])
  registerForm.appendChild(emailField[1])
  registerForm.appendChild(usernameField[0])
  registerForm.appendChild(usernameField[1])
  registerForm.appendChild(passwordField[0])
  registerForm.appendChild(passwordField[1])
  registerForm.appendChild(confirmPasswordField[0])
  registerForm.appendChild(confirmPasswordField[1])

  registerButton.id = 'btn-register'
  registerButton.type = 'submit'
  registerButton.innerText = 'Register'
  registerForm.appendChild(registerButton)

  var registerAnchorText = document.createElement('p')
  registerAnchorText.innerText = 'Already have an account? '
  registerSection.appendChild(registerAnchorText)
  var registerLoginLink = document.createElement('a')
  registerLoginLink.id = 'loginAnchor'
  registerLoginLink.innerText = 'Login'
  registerAnchorText.appendChild(registerLoginLink)

  registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault();
    registerSection.remove()
    body.appendChild(loginSection)
  })
  // Save data of new user when clicking on register button
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameField[1].value
    var email = emailField[1].value
    var username = usernameField[1].value
    var password = passwordField[1].value
    var confirmPassword = confirmPasswordField[1].value

    try {
      registerUser(name, email, username, password, confirmPassword)
      registerForm.reset()
      registerSection.remove()
      body.appendChild(loginSection)
    }
    catch (error) {
      alert(error.message)
      console.error(error)
    }
  })

  return registerSection
}

function buildHomeSection() {
  var homeSection = document.createElement('section')
  var homeTitle = document.createElement('h2')
  var homeText = document.createElement('h3')
  var image = document.createElement('img')
  var logoutButton = document.createElement('button')

  body.appendChild(homeSection)
  homeSection.appendChild(homeTitle)
  homeSection.appendChild(homeText)
  homeSection.appendChild(image)
  homeSection.appendChild(logoutButton)
  homeSection.id = 'home'
  homeSection.classList.add('section-container')
  homeTitle.innerText = 'Home'
  homeText.innerText = 'Hello, ' + loggedUser.name + '!'
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
      homeSection.remove()
      body.appendChild(loginSection)
    }
  })
}