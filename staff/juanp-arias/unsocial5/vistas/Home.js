//function de home
class Home extends Compo {
    constructor() {
        super(document.createElement('section'))
        let compo = this
        compo.container.classList.add('section-container')
        let title = new Heading('HOME', 2)
        compo.add(title)

        const welcome = new Heading('Welcome, ' + loggedInUser.name + '!')
        compo.add(welcome)
        let space = new Heading('...', 4)
        compo.add(space)

        let logout = new Button('Logout', 'button')
        compo.add(logout)

        logout.addBehavior('click', function (event) {
            event.preventDefault()
            loggedInUser = null
            compo.remove()
            page.add(loginSection)
        })

        let createPostButton = new Button('+', 'button')
        compo.add(createPostButton)

        createPostButton.addBehavior('click', function () {

            var createPost = new CreatePost()
            compo.children[compo.children.length - 1].remove()
            compo.add(createPost)
        })

        let postList = new PostList()
        compo.add(postList)

    }
}
