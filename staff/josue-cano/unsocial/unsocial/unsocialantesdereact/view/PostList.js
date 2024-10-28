class PostList extends Compo {
    constructor() {
        super(document.createElement('div'))

        var title = new Heading('Posts', 3)
        this.add(title)

        try {
            // traigo los posts con toreserved en orden inverso de ultimo subido a mas antiguo
            var posts = getPosts().toReversed()
            //foreach revisa los post de la lista
            posts.forEach(function (post) {
                var postItem = new PostItem(post.username, post.image, post.text, post.date)

                this.add(postItem)
            }.bind(this))
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
}

