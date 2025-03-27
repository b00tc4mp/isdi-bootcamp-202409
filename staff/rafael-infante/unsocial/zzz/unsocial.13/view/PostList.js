class PostList extends Compo {
  constructor() {
    super(document.createElement('div'))

    const title = new Heading('Posts', 3)
    this.add(title)

    try {
      const posts = getPosts().toReversed()

      posts.forEach(post => {
        const _post = new Post(post.username, post.image, post.text, post.date)
        this.add(_post)
      })

    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }
}