function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var createPostTitle = new Heading('Create post', 3)
    this.add(createPostTitle)

    var form = new Form()

    form.add(new Label('Imagen', 'img'))
    var imageInput = new Input('img', 'text')
    form.add(imageInput)

    form.add(new Label('Texto', 'txt'))
    var textInput = new Input('txt', 'text')
    form.add(textInput)

    var publishPostButton = new Button('submit', 'Publish')
    form.add(publishPostButton)

    this.add(form)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var image = imageInput.getValue()
        var text = textInput.getValue()

        try {
            createPost(loggedInUser.username, image, text)

            this.removeSelf()

            var postList = new PostList()
            home.add(postList)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    }.bind(this))
}

CreatePost.prototype = Object.create(Compo.prototype)
CreatePost.prototype.constructor = CreatePost