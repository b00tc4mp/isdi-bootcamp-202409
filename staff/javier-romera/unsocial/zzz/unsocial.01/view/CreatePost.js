class CreatePost extends Compo {
    constructor() {
        super(document.createElement('div'))

        const createPostTitle = new Heading('Create post', 3)
        this.add(createPostTitle)

        const form = new Form()

        form.add(new Label('Imagen', 'img'))
        const imageInput = new Input('img', 'text')
        form.add(imageInput)

        form.add(new Label('Texto', 'txt'))
        const textInput = new Input('txt', 'text')
        form.add(textInput)

        const publishPostButton = new Button('submit', 'Publish')
        form.add(publishPostButton)

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