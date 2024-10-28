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

        this.removeSelf()

        page.add(login)
    }.bind(this))

    var createPostButton = new Button('+', 'button')
    createPostButton.container.classList.add('create-post-button')
    this.add(createPostButton)

    createPostButton.addBehaviour('click', function (event) {
        var createPost = new CreatePost()

        this.children[this.children.length - 1].removeSelf()

        this.add(createPost)
    }.bind(this))

    var postList = new PostList()
    this.add(postList)
}

Home.extends(Compo)