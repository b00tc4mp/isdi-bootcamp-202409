


function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('Create Post', 3)
    this.add(title)

    var form = new Form()

    var imageLabel = new Label('Image', 'image')
    var imageInput = new Input('text', 'image')
    form.add(imageLabel)
    form.add(imageInput)

    var textLabel = new Label('Text', 'text')
    var textInput = new Input('text', 'text')
    form.add(textLabel)
    form.add(textInput)

    var submitButton = new Button('Create', 'submit')
    form.add(submitButton)

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

CreatePost.extends(Compo)