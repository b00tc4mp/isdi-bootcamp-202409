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

Home.extends(Compo)