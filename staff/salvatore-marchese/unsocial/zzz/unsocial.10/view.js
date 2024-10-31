/**
 * Constructs Login instances
 */
function Login() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Login', 2)
    this.add(title)

    var form = new Form()
    this.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new PasswordInput('password')
    form.add(passwordInput)

    var submitButton = new Button('Login', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            this.remove()

            var home = new Home()

            page.add(home)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    }.bind(this))


    var registerLink = new Link('Register')
    this.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        this.remove()

        var register = new Register()

        page.add(register)
    }.bind(this))
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

/**
 * Constructs Register instances
 */
function Register() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Register', 2)
    this.add(title)

    var form = new Form()
    this.add(form)

    form.add(new Label('Name', 'name'))
    var nameInput = new Input('text', 'name')
    form.add(nameInput)

    form.add(new Label('E-mail', 'email'))
    var emailInput = new Input('email', 'email')
    form.add(emailInput)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new PasswordInput('password')
    form.add(passwordInput)

    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new PasswordInput('password-repeat')
    form.add(passwordRepeatInput)

    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var passwordRepeat = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            this.remove()

            page.add(login)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }.bind(this))

    var loginLink = new Link('Login')
    this.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        this.remove()
        page.add(login)
    }.bind(this))
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

/**
 * Constructs Home instances
 */
function Home() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Home', 2)
    this.add(title)

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
    this.add(userTitle)

    var logoutButton = new Button('Logout', 'button')
    this.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        this.remove()

        page.add(login)
    }.bind(this))
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home

CreatePost.prototype = Object.create(Compo.prototype)
CreatePost.prototype.constructor = CreatePost

function Post(username, image, text, date) {
    Compo.call(this, document.createElement('div'))

    var userTitle = new Heading(username, 4)
    this.add(userTitle)

    var picture = new Image(image)
    this.add(picture)

    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)
}

Post.prototype = Object.create(Compo.prototype)
Post.prototype.constructor = Post

function PostList() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('Posts', 3)
    this.add(title)

    try {
        var posts = getPosts().toReversed()

        posts.forEach(function (post) {
            var _post = new Post(post.username, post.image, post.text, post.date)

            this.add(_post)
        }.bind(this))
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

PostList.prototype = Object.create(Compo.prototype)
PostList.prototype.constructor = PostList