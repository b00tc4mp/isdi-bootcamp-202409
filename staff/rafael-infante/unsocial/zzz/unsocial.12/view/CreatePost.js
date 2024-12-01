function CreatePost(className) {
  Compo.call(this, document.createElement('div'))

  this.container.classList.add(className)

  var title = new Heading('Create a Post', 3)
  this.add(title)

  var form = new Form('form-container')

  var imageLabel = new Label('image', 'Image')
  var imageInput = new Input('image', 'text', 'Select an image', true)
  form.add(imageLabel)
  form.add(imageInput)

  var textLabel = new Label('text', 'Text')
  var textInput = new Input('text', 'text', 'Write a text', true)
  form.add(textLabel)
  form.add(textInput)

  var submitButton = new Button('submit', 'submit', 'Create')
  form.add(submitButton)

  this.add(form)

  form.addBehavior('submit', function (event) {
    event.preventDefault()
    var image = imageInput.getValue()
    var text = textInput.getValue()

    try {
      createpost(loggedUser.username, image, text)
      form.reset()
      this.remove()
      var postList = new PostList()
      home.add(postList)

    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }.bind(this))
}

CreatePost.extends(Compo)