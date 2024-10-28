/**
* Constructs Home instances Personal
*/
function Home() {
    Compo.call(this, document.createElement('section'))

    var title = new Heading('Home', 2)
    this.add(title)

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!', 3)
    this.add(userTitle)

    var logoutButton = new Button('Logout', 'button')
    this.add(logoutButton)

    logoutButton.addBehavior('click', function (event) {
        event.preventDefault()

        loggedInUser = null

        this.removeSelf()

        page.add(login)

    }.bind(this))


    //Aquí va el botón para publicar un nuevo post
    var addPostButton = new Button('✚ New Post', 'button')
    this.add(addPostButton)

    addPostButton.addBehavior('click', function () {
        var createPost = new CreatePost()

        //Qiuamos la lista de posts
        this.children[this.children.length - 1].removeSelf() //Verificar que he creado la función

        this.add(createPost)
    }.bind(this))

    var postList = new PostList()
    this.add(postList)
}

Home.extends(Compo)
//Home.prototype = Object.create(Compo.prototype)
//Home.prototype.constructor = Home