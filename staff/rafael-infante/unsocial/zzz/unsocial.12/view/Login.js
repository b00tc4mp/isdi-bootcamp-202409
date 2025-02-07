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
  var passwordInput = new Passwordinput('password-container', 'password', 'password', 'Enter your password', true)
  form.add(passwordInput)

  var submitButton = new Button('btn-login', 'submit', 'Login')
  form.add(submitButton)

  var anchorText = document.createElement('p')
  anchorText.innerText = "Don't have an account? "
  this.container.appendChild(anchorText)

  var registerLink = new Link('Register', '#')

  anchorText.appendChild(registerLink.container)

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
      home = new Home()
      page.add(home)
    }
    catch (error) {
      passwordInput.setValue('')
      alert(error.message)
      console.error(error)
    }
  }.bind(this))

}

Login.extends(Compo)