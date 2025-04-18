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
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    var submitButton = new Button('Login', 'submit')
    form.add(submitButton)

    form.addBehaviour('submit', function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try {
            loggedInUser = loginUser(username, password)

            form.reset()

            this.remove()

            home = new Home()

            page.add(home)
        } catch (error) {
            passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    }.bind(this))

    var registerLink = new Link('Register')
    this.add(registerLink)

    registerLink.addBehaviour('click', function (event) {
        event.preventDefault()

        form.reset()

        this.remove()

        var register = new Register()

        page.add(register)
    }.bind(this))
}

Login.prototype = Object.create(Compo.prototype)
Login.prototype.constructor = Login

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
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    form.add(new Label('Repeat password', 'password-repeat'))
    var passwordRepeatInput = new Input('password', 'password-repeat')
    form.add(passwordRepeatInput)

    var submitButton = new Button('Register', 'submit')
    form.add(submitButton)

    form.addBehaviour('submit', function (event) {
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

    loginLink.addBehaviour('click', function (event) {
        event.preventDefault()

        this.remove()

        page.add(login)
    }.bind(this))
}

Register.prototype = Object.create(Compo.prototype)
Register.prototype.constructor = Register

function Home() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Home', 2)
    this.add(title)

    var userTitle = new Heading('Hello ' + loggedInUser.name + '!', 3)
    this.add(userTitle)

    var logoutButton = new Button('Logout', 'button')
    this.add(logoutButton)

    logoutButton.addBehaviour('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        this.remove()

        page.add(login)
    }.bind(this))

    var createPostButton = new Button('+', 'button')
    createPostButton.container.classList.add('create-post-button')
    this.add(createPostButton)

    createPostButton.addBehaviour('click', function (event) {
        var createPost = new CreatePost()

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

    var title = new Heading('Create post', 2)
    this.add(title)

    var post = new Form()
    this.add(post)

    post.add(new Label('Image link', 'img'))
    var imgInput = new Input('text', 'img')
    post.add(imgInput)

    post.add(new Label('Text', 'txt'))
    var txtInput = new Input('text', 'txt')
    post.add(txtInput)

    var publishPostButton = new Button('Publish', 'submit')
    publishPostButton.container.classList.add('publish-post-button')
    post.add(publishPostButton)

    post.addBehaviour('submit', function (event) {
        event.preventDefault()

        var image = imgInput.getValue()
        var text = txtInput.getValue()

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
    userTitle.container.style.textDecoration = 'underline'
    userTitle.container.style.color = 'yellow'
    userTitle.container.style.marginTop = '100px'
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