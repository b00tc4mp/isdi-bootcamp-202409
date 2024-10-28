/**
 * Builds Register instances
 */
class Register extends Compo {
  constructor() {
    super(document.createElement('section'))

    this.container.classList.add('section-container')

    const title = new Heading('Register to unSocial', 2)
    this.add(title)

    const form = new Form('form-container')
    this.add(form)

    form.add(new Label('name', 'Name'))
    const nameInput = new Input('name', 'text', 'Enter your name', true)
    form.add(nameInput)

    form.add(new Label('email', 'Email'))
    const emailInput = new Input('email', 'email', 'Enter your email', true)
    form.add(emailInput)

    form.add(new Label('username', 'User name'))
    const usernameInput = new Input('username', 'text', 'Enter your user name', true)
    form.add(usernameInput)

    form.add(new Label('password', 'Password'))
    const passwordInput = new Input('password', 'password', 'Enter your password', true)
    form.add(passwordInput)

    form.add(new Label('confirm-password', 'Confirm password'))
    const confirmpasswordInput = new Input('confirm-password', 'password', 'Confirm your password', true)
    form.add(confirmpasswordInput)

    const registerButton = new Button('btn-register', 'submit', 'Register')
    form.add(registerButton)

    const registerAnchorText = document.createElement('p')
    registerAnchorText.innerText = 'Already have an account? '
    this.container.appendChild(registerAnchorText)

    const loginLink = new Link('Login', '#')
    registerAnchorText.appendChild(loginLink.container)

    loginLink.addBehavior('click', event => {
      event.preventDefault();
      this.remove()
      page.add(login)
    })

    // Save data of new user when clicking on register button
    form.addBehavior('submit', event => {
      event.preventDefault()
      const name = nameInput.getValue()
      const email = emailInput.getValue()
      const username = usernameInput.getValue()
      const password = passwordInput.getValue()
      const confirmPassword = confirmpasswordInput.getValue()

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
    })
  }
}