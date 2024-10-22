/**
 * Builds Login instances
 */
class Login extends Compo {
  constructor() {
    super(document.createElement('section'))

    this.container.classList.add('section-container')

    const paragraph = document.createElement('p')
    paragraph.innerText = 'Welcome !'
    this.container.appendChild(paragraph)

    const title = new Heading('Sign in to unSocial', 2)
    this.add(title)

    const text = new Heading('Write username and password to access', 4)
    this.add(text)

    const form = (new Form('form-container'))
    this.add(form)

    form.add(new Label('login-user', 'User name'))
    const usernameInput = new Input('login-user', 'text', 'Enter your user name', true)
    form.add(usernameInput)

    form.add(new Label('login-password', 'Password'))
    const passwordInput = new Passwordinput('password-container', 'password', 'password', 'Enter your password', true)
    form.add(passwordInput)

    const submitButton = new Button('btn-login', 'submit', 'Login')
    form.add(submitButton)

    const anchorText = document.createElement('p')
    anchorText.innerText = "Don't have an account? "
    this.container.appendChild(anchorText)

    const registerLink = new Link('Register', '#')

    anchorText.appendChild(registerLink.container)

    // Send user to register section when clicking on register link
    registerLink.addBehavior('click', event => {
      event.preventDefault()
      this.remove()
      const register = new Register()
      page.add(register)
    })

    // actions when submitting the login Form
    form.addBehavior('submit', event => {
      event.preventDefault()
      const username = usernameInput.getValue()
      const password = passwordInput.getValue()

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
    })
  }
}