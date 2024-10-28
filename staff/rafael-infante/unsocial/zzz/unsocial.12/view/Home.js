/**
 * Builds Home instances
 */
function Home() {
  Compo.call(this, document.createElement('section'))

  this.container.id = 'home'
  this.container.classList.add('section-container')

  var title = new Heading('Home', 2)
  this.add(title)

  var text = new Heading('Hello, ' + loggedUser.name + '!', 3)
  this.add(text)

  var image = new Picture('images/boy.png', 'boy')
  this.add(image)

  var logoutButton = new Button('btn.logout', 'submit', 'Logout')
  this.add(logoutButton)

  // Functionality of logout button
  logoutButton.container.addEventListener('click', function (event) {
    var condition = prompt('Are you sure? (y/n)')
    if (condition === 'y') {
      event.preventDefault()
      loggedUser = null
      this.remove()
      page.add(login)
    }
  }.bind(this))

  var postButton = new Button('btn-post', 'button', 'Post')
  this.add(postButton)

  postButton.addBehavior('click', function () {

    var createPost = new CreatePost('section-container')
    this.children[this.children.length - 1].remove()
    this.add(createPost)
  }.bind(this))

  var postList = new PostList()
  this.add(postList)
}

Home.extends(Compo)