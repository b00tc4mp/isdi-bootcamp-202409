class CreatePost extends Compo {
    constructor() {
        super(document.createElement('div'))

        const title = new Heading('Create post', 2)
        this.add(title)

        const post = new Form()
        this.add(post)

        const imgLabel = new Label('Image link', 'img')
        const imgInput = new Input('text', 'img')
        post.add(imgLabel)
        post.add(imgInput)

        const txtLabel = new Label('Text', 'txt')
        const txtInput = new Input('text', 'txt')
        post.add(txtLabel)
        post.add(txtInput)

        const publishPostButton = new Button('Publish', 'submit')
        publishPostButton.container.classList.add('publish-post-button')
        post.add(publishPostButton)

        post.addBehaviour('submit', event => {
            event.preventDefault()

            const image = imgInput.getValue()
            const text = txtInput.getValue()

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