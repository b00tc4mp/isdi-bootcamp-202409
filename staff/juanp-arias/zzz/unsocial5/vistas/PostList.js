class PostList extends Compo {
    constructor() {
        super(document.createElement('div'))

        let title = new Heading('POSTS', 3)
        this.add(title)

        try {
            let posts = getPosts().toReversed()

            posts.forEach(function (post) {
                let _post = new Post(post.username, post.image, post.text, post.date)
                this.add(_post)
            }.bind(this))

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
}