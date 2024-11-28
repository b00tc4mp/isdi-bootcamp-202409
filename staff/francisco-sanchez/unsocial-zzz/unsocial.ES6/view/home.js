/**
* Constructs Home instances Personal
*/

class Home extends Compo {
    constructor() {
        super(document.createElement('section'))
        const title = new Heading('Home', 2)
        this.add(title)

        let userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
        this.add(userTitle)

        let logoutButton = new Button('Logout', 'button')
        this.add(logoutButton)

        logoutButton.addBehavior('click', event => {
            event.preventDefault()

            loggedInUser = null

            this.removeSelf()

            page.add(login)

        })

        //Aquí va el botón para publicar un nuevo post
        let addPostButton = new Button('✚ New Post', 'button')
        this.add(addPostButton)

        addPostButton.addBehavior('click', () => {
            let createPost = new CreatePost()

            //Qiuamos la lista de posts
            this.children[this.children.length - 1].removeSelf() //Verificar que he creado la función

            this.add(createPost)
        })

        let postList = new PostList()
        this.add(postList)
    }
}