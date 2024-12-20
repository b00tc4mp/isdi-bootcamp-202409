class CreatePost extends Compo {
    constructor() {
        super(document.createElement('div'))

        const title = new Heading('Create Post', 3)
        this.add(title)

        const form = new Form()

        const imageLabel = new Label('Image', 'image')
        const imageInput = new Input('text', 'image')
        form.add(imageLabel)
        form.add(imageInput)

        const textLabel = new Label('Text', 'text')
        const textInput = new Input('text', 'text')
        form.add(textLabel)
        form.add(textInput)

        const submitButton = new Button('Create', 'submit')
        form.add(submitButton)

        this.add(form)

        form.addBehavior('submit', event => {
            event.preventDefault()

            const image = imageInput.getValue()
            const text = textInput.getValue()

            try {
                createPost(loggedInUser.username, image, text)

                this.removeSelf()

                const postList = new PostList()
                home.add(postList)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })
    }
}

