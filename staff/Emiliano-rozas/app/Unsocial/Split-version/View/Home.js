class Home extends Compo {
    constructor() {
        //creamos los elementos
        //Creamos section
        super(document.createElement("section"))

        //Creamos el titulo

        const title = new Heading("Home", 2)
        this.add(title)
        //Creamos la bienvenida

        const greetingTitle = new Heading(`Hello, ${loggedInUser.name}!`, 3)
        this.add(greetingTitle)
        //Creamos el boton

        const logoutButton = new Button('Logout', 'button')
        this.add(logoutButton)

        logoutButton.addBehavior('click', event => {
            event.preventDefault()

            loggedInUser = null

            this.removeSelf()

            page.add(login)
        })

        // botonseto de add post
        const addPostButton = new Button('➕', 'button')
        this.add(addPostButton)

        //comportamiento del boton
        addPostButton.addBehavior('click', () => {
            const createPost = new CreatePost()

            // para eliminar los post de la memoria
            this.children[this.children.length - 1].removeSelf()

            this.add(createPost)
        })

        const postList = new PostList()
        this.add(postList)
    }
}