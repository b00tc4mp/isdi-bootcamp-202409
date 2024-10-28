function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var self = this

    var title = new Heading('Create Post', 3)
    self.add(title)

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

    self.add(form)

    form.addBehavior('submit', function (event) {
        event.preventDefault()

        var image = imageInput.getValue()
        var text = textInput.getValue()

        try {
            createPost(loggedInUser.username, image, text)

            self.remove()

            var postList = new PostList()
            home.add(postList)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })
}

CreatePost.extends(Compo)