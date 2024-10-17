class PostList extends Compo {
    constructor() {
        super(document.createElement('ul'))

        const title = new Heading('Posts', 3)
        this.add(title)

        try {
            const posts = getPosts().toReversed()

            posts.forEach(post => {

                const postItem = new PostItem(post.username, post.image, post.text, post.date, post.likes, post.likedBy)

                this.add(postItem)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
}