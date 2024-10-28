/**
 * Builds Home instances
 */
class Home extends Compo {
  constructor() {
    super(document.createElement('section'))

    this.container.id = 'home'
    this.container.classList.add('section-container')

    const title = new Heading('Home', 2)
    this.add(title)

    const text = new Heading('Hello, ' + loggedUser.name + '!', 3)
    this.add(text)

    const image = new Picture('images/boy.png', 'boy')
    this.add(image)

    const logoutButton = new Button('btn.logout', 'submit', 'Logout')
    this.add(logoutButton)

    // Functionality of logout button
    logoutButton.container.addEventListener('click', event => {
      const condition = prompt('Are you sure? (y/n)')
      if (condition === 'y') {
        event.preventDefault()
        loggedUser = null
        this.remove()
        page.add(login)
      }
    })

    const postButton = new Button('btn-post', 'button', 'Post')
    this.add(postButton)

    postButton.addBehavior('click', () => {

      const createPost = new CreatePost('section-container')
      this.children[this.children.length - 1].remove()
      this.add(createPost)
    })

    const postList = new PostList()
    this.add(postList)
  }
}