/**
 * Builds Login instances
 */
function Login() {
  Compo.call(this, document.createElement('section'))

  this.container.classList.add('section-container')

  var paragraph = document.createElement('p')
  paragraph.innerText = 'Welcome !'
  this.container.appendChild(paragraph)

  var title = new Heading('Sign in to unSocial', 2)
  this.add(title)

  var text = new Heading('Write username and password to access', 4)
  this.add(text)

  var form = (new Form('form-container'))
  this.add(form)

  form.add(new Label('login-user', 'User name'))
  var usernameInput = new Input('login-user', 'text', 'Enter your user name', true)
  form.add(usernameInput)

  form.add(new Label('login-password', 'Password'))
  var passwordInput = new Input('login-password', 'password', 'Enter your password', true)
  form.add(passwordInput)


  var submitButton = new Button('btn-login', 'submit', 'Login')
  form.add(submitButton)

  var anchorText = document.createElement('p')
  anchorText.innerText = "Don't have an account? "
  this.container.appendChild(anchorText)

  var registerLink = new Link('Register', '#')

  anchorText.appendChild(registerLink.container)

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
  registerLink.addBehavior('click', function (event) {
    event.preventDefault()
    this.remove()
    var register = new Register()
    page.add(register)
  }.bind(this))
  // actions when submitting the login Form
  form.addBehavior('submit', function (event) {
    event.preventDefault()

    var username = usernameInput.getValue()
    var password = passwordInput.getValue()

    try {
      loggedUser = authenticateUser(username, password)
      form.container.reset()
      this.remove()
      var home = new Home()
      page.add(home)
    }
    catch (error) {
      passwordInput.setValue('')
      alert(error.message)
      console.error(error)
    }
  }.bind(this))

}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

/**
 * Builds Register instances
 */
function Register() {
  Compo.call(this, document.createElement('section'))

  this.container.classList.add('section-container')

  var title = new Heading('Register to unSocial', 2)
  this.add(title)

  var form = new Form('form-container')
  this.add(form)

  form.add(new Label('name', 'Name'))
  var nameInput = new Input('name', 'text', 'Enter your name', true)
  form.add(nameInput)

  form.add(new Label('email', 'Email'))
  var emailInput = new Input('email', 'email', 'Enter your email', true)
  form.add(emailInput)

  form.add(new Label('username', 'User name'))
  var usernameInput = new Input('username', 'text', 'Enter your user name', true)
  form.add(usernameInput)

  form.add(new Label('password', 'Password'))
  var passwordInput = new Input('password', 'password', 'Enter your password', true)
  form.add(passwordInput)

  form.add(new Label('confirm-password', 'Confirm password'))
  var confirmpasswordInput = new Input('confirm-password', 'password', 'Confirm your password', true)
  form.add(confirmpasswordInput)

  var registerButton = new Button('btn-register', 'submit', 'Register')
  form.add(registerButton)

  var registerAnchorText = document.createElement('p')
  registerAnchorText.innerText = 'Already have an account? '
  this.container.appendChild(registerAnchorText)

  var loginLink = new Link('Login', '#')
  registerAnchorText.appendChild(loginLink.container)

  loginLink.addBehavior('click', function (event) {
    event.preventDefault();
    this.remove()
    page.add(login)
  }.bind(this))
  // Save data of new user when clicking on register button
  form.addBehavior('submit', function (event) {
    event.preventDefault()
    var name = nameInput.getValue()
    var email = emailInput.getValue()
    var username = usernameInput.getValue()
    var password = passwordInput.getValue()
    var confirmPassword = confirmpasswordInput.getValue()

    try {
      registerUser(name, email, username, password, confirmPassword)
      form.reset()
      this.remove()
      page.add(login)
    }
    catch (error) {
      alert(error.message)
      console.error(error)
    }
  }.bind(this))
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

/**
 * Builds Home instances
 */
function Home() {
  Compo.call(this, document.createElement('section'))

  this.container.id = 'home'
  this.container.classList.add('section-container')

  var title = new Heading('Home', 2)
  this.add(title)

  var text = new Heading('Hello, ' + loggedUser.name + '!', 3)
  this.add(text)

  var image = new Picture('/staff/rafael-infante/unsocial/images/boy.png', 'boy')
  this.add(image)

  var logoutButton = new Button('btn.logout', 'submit', 'Logout')
  this.add(logoutButton)

  // Functionality of logout button
  logoutButton.container.addEventListener('click', function (event) {
    var condition = prompt('Are you sure? (y/n)')
    if (condition === 'y') {
      event.preventDefault()
      loggedUser = null
      this.remove()
      page.add(login)
    }
  }.bind(this))
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home