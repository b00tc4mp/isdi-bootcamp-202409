//Aquí vamos a añadir el formulario para crear un nuevo post
class CreatePost extends Compo {
    constructor() {
        super(document.createElement('div'))
        const title = new Heading('Create Post', 3)
        this.add(title)

        let form = new Form()

        let imageLabel = new Label('Image', 'image')
        let imageInput = new Input('text', 'image')
        form.add(imageLabel)
        form.add(imageInput)

        let textLabel = new Label('Text', 'text')
        let textInput = new Input('text', 'text')
        form.add(textLabel)
        form.add(textInput)

        let submitButton = new Button('Create', 'submit')
        form.add(submitButton)

        this.add(form)

        form.addBehavior('submit', event => {
            event.preventDefault()

            let image = imageInput.getValue()
            let text = textInput.getValue()

            try {
                createPost(loggedInUser.username, image, text)

                this.removeSelf()

                let postList = new PostList()
                home.add(postList)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }

        })
    }
}
