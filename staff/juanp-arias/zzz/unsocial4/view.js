//function de login

function Login() {
    Compo.call(this, document.createElement('section'))
    var compo = this
    compo.container.classList.add('section-container')
    var title = new Heading('LOGIN', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new PasswordInput('Password', 'password')
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

            compo.remove()

            //SECCIÓN HOME
            homeSection = new Home()

            page.add(homeSection)

        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })

    //CREACIÓN LINK TIPO ANCHOR QUE TE LLEVA A LA SECCIÓN DE REGISTRO
    var registerAccount = new Heading("Don't have an account?", 4)
    compo.add(registerAccount)
    var registerLink = new Link('Register')
    compo.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        //SECCIÓN DE REGISTRO
        var registerSection = new Register()

        page.add(registerSection)
    })

}
Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

//function de register
function Register() {
    Compo.call(this, document.createElement('section'))
    var compo = this
    compo.container.classList.add('section-container')
    var title = new Heading('REGISTER', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)

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
    var passwordInput = new PasswordInput('password', 'password')
    form.add(passwordInput)

    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new PasswordInput('password', 'password-repeat')
    form.add(passwordRepeatInput)

    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var repeatpassword = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, repeatpassword)

            form.reset()
            compo.remove()
            page.add(loginSection)

        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    })

    var loginLink = new Link('Login')
    compo.add(loginLink)

    loginLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()
        page.add(loginSection)
    })
}
Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

//function de home
function Home() {
    Compo.call(this, document.createElement('section'))
    var compo = this
    compo.container.classList.add('section-container')
    var title = new Heading('HOME', 2)
    compo.add(title)

    var welcome = new Heading('Welcome, ' + loggedInUser.name + '!')
    compo.add(welcome)
    var space = new Heading('...', 4)
    compo.add(space)

    var logout = new Button('Logout', 'button')
    compo.add(logout)

    logout.addBehavior('click', function (event) {
        event.preventDefault()
        loggedInUser = null
        compo.remove()
        page.add(loginSection)
    })

    var createPostButton = new Button('+', 'button')
    compo.add(createPostButton)
    
    createPostButton.addBehavior('click', function () {
        
        var createPost = new CreatePost()
        compo.children[compo.children.length - 1].remove()
        compo.add(createPost)
    })
    
    var postList = new PostList()
    compo.add(postList)
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home

function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('TELL US', 2)
    this.add(title)

    var form = new Form()

    var imageLabel = new Label('Image', 'img')
    var imageInput = new Input('text', 'img')
    form.add(imageLabel)
    form.add(imageInput)

    var textLabel = new Label('Comment', 'text')
    var textInput = new Input('text', 'text')
    form.add(textLabel)
    form.add(textInput)

    var postButton = new Button('POST', 'submit')
    form.add(postButton)
    this.add(form)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var image = imageInput.getValue()
        var text = textInput.getValue()

        try {
            createPost(loggedInUser.username, image, text)

            this.remove()

            var postList = new PostList()
            homeSection.add(postList)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }.bind(this))
}

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

    var title = new Heading('POSTS', 3)
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