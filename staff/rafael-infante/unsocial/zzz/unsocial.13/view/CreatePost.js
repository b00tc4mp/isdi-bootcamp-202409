class CreatePost extends Compo {
  constructor(className) {
    super(document.createElement('div'))

    this.container.classList.add(className)

    const title = new Heading('Create a Post', 3)
    this.add(title)

    const form = new Form('form-container')

    const imageLabel = new Label('image', 'Image')
    const imageInput = new Input('image', 'text', 'Select an image', true)
    form.add(imageLabel)
    form.add(imageInput)

    const textLabel = new Label('text', 'Text')
    const textInput = new Input('text', 'text', 'Write a text', true)
    form.add(textLabel)
    form.add(textInput)

    const submitButton = new Button('submit', 'submit', 'Create')
    form.add(submitButton)

    this.add(form)

    form.addBehavior('submit', event => {
      event.preventDefault()
      const image = imageInput.getValue()
      const text = textInput.getValue()

      try {
        createpost(loggedUser.username, image, text)
        form.reset()
        this.remove()
        const postList = new PostList()
        home.add(postList)

      } catch (error) {
        alert(error.message)

        console.error(error)
      }
    })
  }
}