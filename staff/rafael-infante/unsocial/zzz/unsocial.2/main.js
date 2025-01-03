var loggedUser = null
// Login section
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
var loginBottomText = document.createElement('p')

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
loginSection.appendChild(loginBottomText)
loginBottomText.id = 'bottom-text'
loginBottomText.innerHTML = `Don't have an account? <a id="registerAnchor" href="">Register</a>`

var body = document.querySelector('body')
body.appendChild(loginSection)

var icon = document.querySelector('#icon')
var input = document.querySelector('#password')
var isVisible = false

icon.addEventListener('click', function (event) {
  icon.classList.toggle('fa-eye-slash')
  if (!isVisible) {
    input.type = 'text'
    isVisible = true
  } else {
    input.type = 'password'
    isVisible = false
  }
})

var registerAnchor = document.getElementById('registerAnchor')
// Send user to register section when clicking on register anchor
registerAnchor.addEventListener('click', function (event) {
  event.preventDefault()
  loginSection.remove()
  // Register Section
  var registerSection = document.createElement('section')
  var registerTitle = document.createElement('h2')
  var registerForm = document.createElement('form')
  var registerNameLabel = document.createElement('label')
  var registerNameInput = document.createElement('input')
  var registerEmailLabel = document.createElement('label')
  var registerEmailInput = document.createElement('input')
  var registerUsernameLabel = document.createElement('label')
  var registerUsernameInput = document.createElement('input')
  var registerPasswordLabel = document.createElement('label')
  var registerPasswordInput = document.createElement('input')
  var registerConfirmPasswordLabel = document.createElement('label')
  var registerConfirmPasswordInput = document.createElement('input')
  var registerButton = document.createElement('button')


  registerSection.classList.add('section-container')
  body.appendChild(registerSection)
  registerTitle.id = 'register-title'
  registerTitle.innerText = 'Register to unSocial'
  registerSection.appendChild(registerTitle)
  registerForm.classList.add('form-container')
  registerSection.appendChild(registerForm)
  registerNameLabel.htmlFor = 'name'
  registerNameLabel.innerText = 'Name'
  registerEmailLabel.htmlFor = 'email'
  registerEmailLabel.innerText = 'E-mail'
  registerUsernameLabel.htmlFor = 'username'
  registerUsernameLabel.innerText = 'User name'
  registerPasswordLabel.htmlFor = 'password'
  registerPasswordLabel.innerText = 'Password'
  registerConfirmPasswordLabel.htmlFor = 'confirm-password'
  registerConfirmPasswordLabel.innerText = 'Confirm Password'

  registerNameInput.type = 'text'
  registerNameInput.id = 'name'
  registerNameInput.placeholder = 'Enter your name'
  registerNameInput.required = true

  registerEmailInput.type = 'email'
  registerEmailInput.id = 'email'
  registerEmailInput.placeholder = 'Enter your E-mail'
  registerEmailInput.required = true

  registerUsernameInput.type = 'text'
  registerUsernameInput.id = 'username'
  registerUsernameInput.placeholder = 'Enter your user name'
  registerUsernameInput.required = true

  registerPasswordInput.type = 'password'
  registerPasswordInput.id = 'password'
  registerPasswordInput.placeholder = 'Enter your password'
  registerPasswordInput.required = true

  registerConfirmPasswordInput.type = 'password'
  registerConfirmPasswordInput.id = 'confirm-password'
  registerConfirmPasswordInput.placeholder = 'Confirm your password'
  registerConfirmPasswordInput.required = true

  registerForm.appendChild(registerNameLabel)
  registerForm.appendChild(registerNameInput)
  registerForm.appendChild(registerEmailLabel)
  registerForm.appendChild(registerEmailInput)
  registerForm.appendChild(registerUsernameLabel)
  registerForm.appendChild(registerUsernameInput)
  registerForm.appendChild(registerPasswordLabel)
  registerForm.appendChild(registerPasswordInput)
  registerForm.appendChild(registerConfirmPasswordLabel)
  registerForm.appendChild(registerConfirmPasswordInput)

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
  registerLoginLink.href = ''
  registerAnchorText.appendChild(registerLoginLink)
  // Send user to login section when clicking on login anchor
  registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault();
    registerSection.remove()
    body.appendChild(loginSection)
  })
  // Save data of new user when clicking on register button
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = registerNameInput.value
    var email = registerEmailInput.value
    var username = registerUsernameInput.value
    var password = registerPasswordInput.value
    var confirmPassword = registerConfirmPasswordInput.value

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
})
// Compare data entered by the user with our users list
loginForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var loginUsername = loginUsernameInput.value
  var loginPassword = loginPasswordInput.value

  try {
    loggedUser = authenticateUser(loginUsername, loginPassword)
    loginForm.reset()
    loginSection.remove()
    // Home section
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
  catch (error) {
    loginPasswordInput.value = ''
    alert(error.message)
    console.error(error)
  }
})