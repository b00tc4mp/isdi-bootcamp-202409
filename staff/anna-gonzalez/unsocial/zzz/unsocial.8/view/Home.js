class Home extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Home', 2)
        this.add(title)

        const userTitle = new Heading('Hello ' + loggedInUser.name + '!', 3)
        this.add(userTitle)

        const logoutButton = new Button('Logout', 'button')
        this.add(logoutButton)

        logoutButton.addBehaviour('click', event => {
            event.preventDefault()

            loggedInUser = null

            this.removeSelf()

            page.add(login)
        })

        const createPostButton = new Button('+', 'button')
        createPostButton.container.classList.add('create-post-button')
        this.add(createPostButton)

        createPostButton.addBehaviour('click', () => {
            const createPost = new CreatePost()

            this.children[this.children.length - 1].removeSelf()

            this.add(createPost)
        })

        const postList = new PostList()
        this.add(postList)
    }
}