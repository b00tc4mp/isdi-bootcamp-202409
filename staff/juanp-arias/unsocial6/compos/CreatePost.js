
class CreatePost extends Compo {
    constructor() {
        super(document.createElement('div'))

        const title = new Heading('TELL US', 2)
        this.add(title)

        const form = new Form()

        const imageLabel = new Label('Image', 'img')
        const imageInput = new Input('text', 'img')
        form.add(imageLabel)
        form.add(imageInput)

        const textLabel = new Label('Comment', 'text')
        const textInput = new Input('text', 'text')
        form.add(textLabel)
        form.add(textInput)

        const postButton = new Button('POST', 'submit')
        form.add(postButton)
        this.add(form)

        form.addBehavior('submit', (event) =>{
            event.preventDefault()

            const image = imageInput.getValue()
            const text = textInput.getValue()

            try {
                createPost(loggedInUser.username, image, text)

                this.remove()

                var postList = new PostList()
                homeSection.add(postList)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })
    }

}