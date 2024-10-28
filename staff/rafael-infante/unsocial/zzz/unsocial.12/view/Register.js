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

Register.extends(Compo)