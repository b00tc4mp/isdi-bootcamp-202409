function Login() {
    Compo.call(this, document.createElement('section'))

    var compo = this

    var title = new Heading('Login', 2)
    compo.add(title)

    var form = new Form()
    compo.add(form)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
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

            var home = new Home()

            body.add(home)
        } catch (error) {
            //passwordInput.container.value = ''
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    })


    var registerLink = new Link('Register')
    compo.add(registerLink)

    registerLink.addBehavior('click', function (event) {
        event.preventDefault()

        compo.remove()

        var register = new Register()

        body.add(register)
    })
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

function Register() {
    Compo.call(this, document.createElement('section'))

    var compo = this

    var title = new Heading('Register', 2)
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
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    form.add(new Label('Repeat Password', 'password-repeat'))
    var passwordRepeatInput = new Input('password', 'password-repeat')
    form.add(passwordRepeatInput)


    //subir imagen ..no funciona con file...recojo direccion url para subirl a users
    form.add(new Label('Avatar URL', 'avatar'))
    var avatarInput = new Input('url', 'avatar', "http://")
    form.add(avatarInput)




    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var passwordRepeat = passwordRepeatInput.getValue()
        var avatar = avatarInput.getValue()

        try {
            registerUser(name, email, username, password, passwordRepeat, avatar)

            form.reset()

            compo.remove()

            body.add(login)
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
        body.add(login)
    })
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

function Home() {
    Compo.call(this, document.createElement('section'))

    var compo = this

    var title = new Heading('Home', 2)
    compo.add(title)

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
    compo.add(userTitle)

    if (loggedInUser.avatar) {
        var avatarImage = new Compo(document.createElement('img'))
        avatarImage.container.src = loggedInUser.avatar // Aquí se usa la URL del avatar
        avatarImage.container.style.width = '300px'
        avatarImage.container.style.height = '300px'
        compo.add(avatarImage)
    }

    var logoutButton = new Button('Logout', 'button')
    compo.add(logoutButton)

    var createPost= new Button('+', 'button')
    compo.add(createPost)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        compo.remove()

        body.add(login)
    })
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home




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

    var addPostButton = new Button('➕', 'button')
    this.add(addPostButton)

    addPostButton.addBehavior('click', function () {
        var createPost = new CreatePost()

        //postList.remove()
        this.children[this.children.length - 1].remove()

        this.add(createPost)
    }.bind(this))

    var postList = new PostList()
    this.add(postList)
}

Home.prototype = Object.create(Compo.prototype)
Home.prototype.constructor = Home

function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('Create Post', 3)
    this.add(title)

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

    this.add(form)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var image = imageInput.getValue()
        var text = textInput.getValue()

        try {
            createPost(loggedInUser.username, image, text)

            this.remove()

            var postList = new PostList()
            home.add(postList)
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