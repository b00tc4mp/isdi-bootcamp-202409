/**
 * Constructs Home instances
 */
class Home extends Compo {
    constructor() {
        super(document.createElement('section'))

        const title = new Heading('Home', 2)
        this.add(title)

        const greeting = new Heading(`Hey, ${loggedInUser.name}, you're finally awake!`, 3)
        this.add(greeting)

        const logoutButton = new Button('Logout', 'button')
        this.add(logoutButton)

        logoutButton.addBehavior('click', event => {
            event.preventDefault()

            loggedInUser = null

            this.removeSelf()

            page.add(login)
        })

        const addPostButton = new Button('➕', 'button')
        this.add(addPostButton)

        addPostButton.addBehavior('click', () => {
            const createPost = new CreatePost()

            this.children[this.children.length - 1].removeSelf()

            this.add(createPost)
        })

        const postList = new PostList()
        this.add(postList)
    }
}