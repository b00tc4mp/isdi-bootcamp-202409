function Home() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Home', 2)
    this.add(title)

    var welcome = new Heading('Welcome, ' + loggedInUser.name + '!', 3)
    this.add(welcome)

    var logoutButton = new Button('button', 'Logout')
    this.add(logoutButton)

    logoutButton.addBehavior("click", function (event) {
        event.preventDefault()

        loggedInUser = null

        this.removeSelf()

        page.add(login)
    }.bind(this))

    var createPostButton = new Button('button', '+')
    this.add(createPostButton)

    createPostButton.addBehavior('click', function (event) {
        var createPost = new CreatePost()

        this.children[this.children.length - 1].removeSelf()

        this.add(createPost)
    }.bind(this))

    var postList = new PostList()
    this.add(postList)
}

Home.extends(Compo)