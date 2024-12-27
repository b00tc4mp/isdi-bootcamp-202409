/**
 * Constructs Home instances
 */
class Home extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Home', 2)
        this.add(title)

        const welcome = new Heading('Welcome, ' + loggedInUser.name + '!', 3)
        this.add(welcome)

        const logoutButton = new Button('button', 'Logout')
        this.add(logoutButton)

        logoutButton.addBehavior("click", function (event) {
            event.preventDefault()

            loggedInUser = null

            this.removeSelf()

            page.add(login)
        }.bind(this))

        const createPostButton = new Button('button', '+')
        this.add(createPostButton)

        createPostButton.addBehavior('click', function (event) {
            const createPost = new CreatePost()

            this.children[this.children.length - 1].removeSelf()

            this.add(createPost)
        }.bind(this))

        const postList = new PostList()
        this.add(postList)
    }
}