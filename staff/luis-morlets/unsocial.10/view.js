/**
 * Constructs Login instances
 */
function Login() {

    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Login', 2)
    self.add(title)

    var form = new Form()
    self.add(form)

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

            self.remove()

            home = new Home()

            page.add(home)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })

    var anchorText = new Paragraph("Don't have an account? ")
    self.add(anchorText)

    var registerLink = new Link('Register')
    anchorText.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()

        var register = new Register()

        page.add(register)
    })
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

/**
 * Construcs Register instances
 */
function Register() {

    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Register', 2)
    self.add(title)

    var form = new Form()
    self.add(form)

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

            self.remove()

            page.add(login)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var anchorText = new Paragraph('Already have an account? ')
    self.add(anchorText)

    var loginLink = new Link('Login')
    anchorText.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        self.remove()
        page.add(login)
    })
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

/**
 * Constructs Home instances
 */
function Home() {

    Compo.call(this, document.createElement('section'))

    var self = this

    var title = new Heading('Home', 2)
    self.add(title)

    var greeting = new Heading("Hey " + loggedInUser.name + ", you're finally awake!", 3)
    self.add(greeting)

    var logoutButton = new Button('Logout', 'button')
    self.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        self.remove()

        page.add(login)
    })

    var addPostButton = new Button('➕', 'button')
    self.add(addPostButton)

    addPostButton.addBehavior('click', function () {
        var createPost = new CreatePost()

        self.children[self.children.length - 1].remove()

        self.add(createPost)
    })

    var postList = new PostList()
    self.add(postList)
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home

function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var self = this

    var title = new Heading('Create Post', 3)
    self.add(title)

    var form = new Form()

    var imageLabel = new Label('Image', 'image')
    var imageInput = new Input('text', 'image')
    form.add(imageLabel)
    form.add(imageInput)

    var textLabel = new Label('Text', 'text')
    var textInput = new Input('text', 'text')
    form.add(textLabel)
    form.add(textInput)

    var submitButton = new Button('Create', 'submit')
    form.add(submitButton)

    self.add(form)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var image = imageInput.getValue()
        var text = textInput.getValue()

        try {
            createPost(loggedInUser.username, image, text)

            self.remove()

            var postList = new PostList()
            home.add(postList)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })
}

CreatePost.prototype = Object.create(Compo.prototype)
CreatePost.prototype.constructor = CreatePost

function Post(username, image, text, date) {
    Compo.call(this, document.createElement('div'))

    var self = this

    var userTitle = new Heading(username, 4)
    self.add(userTitle)

    var picture = new Image(image)
    self.add(picture)

    var comment = new Paragraph(text)
    self.add(comment)

    var time = new Time(date)
    self.add(time)
}

Post.prototype = Object.create(Compo.prototype)
Post.prototype.constructor = Post

function PostList() {
    Compo.call(this, document.createElement('div'))

    var self = this

    var title = new Heading('Posts', 3)
    self.add(title)

    try {
        var posts = getPosts().toReversed()

        posts.forEach(function (post) {

            var _post = new Post(post.username, post.image, post.text, post.date)

            self.add(_post)
        })
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

PostList.prototype = Object.create(Compo.prototype)
PostList.prototype.constructor = PostList