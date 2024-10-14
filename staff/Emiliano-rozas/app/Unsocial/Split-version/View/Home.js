function Home() {
    //creamos los elementos
    //Creamos section
    Compo.call(this, document.createElement("section"))

    //Creamos el titulo

    var title = new Heading("Home", 2)
    this.add(title)
    //Creamos la bienvenida

    var greetingTitle = new Heading("Hello, " + loggedInUser.name + "!", 3)
    this.add(greetingTitle)
    //Creamos el boton

    var logoutButton = new Button('Logout', 'button')
    this.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        this.remove()

        page.add(login)
    }.bind(this))

    // botonseto de add post
    var addPostButton = new Button('➕', 'button')
    this.add(addPostButton)

    //comportamiento del boton
    addPostButton.addBehavior('click', function () {
        var createPost = new CreatePost()

        // para eliminar los post de la memoria
        this.children[this.children.length - 1].remove()

        this.add(createPost)
    }.bind(this))

    var postList = new PostList()
    this.add(postList)
}

Home.extends(Compo)