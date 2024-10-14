function CreatePost() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('Create post', 2)
    this.add(title)

    var post = new Form()
    this.add(post)

    post.add(new Label('Image link', 'img'))
    var imgInput = new Input('text', 'img')
    post.add(imgInput)

    post.add(new Label('Text', 'txt'))
    var txtInput = new Input('text', 'txt')
    post.add(txtInput)

    var publishPostButton = new Button('Publish', 'submit')
    publishPostButton.container.classList.add('publish-post-button')
    post.add(publishPostButton)

    post.addBehaviour('submit', function (event) {
        event.preventDefault()

        var image = imgInput.getValue()
        var text = txtInput.getValue()

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