function PostList() {
    Compo.call(this, document.createElement('div'))

    var self = this

    var title = new Heading('Posts', 3)
    self.add(title)

    try {
        var posts = getPosts().toReversed()

        posts.forEach(function (post) {

            var postItem = new PostItem(post.username, post.image, post.text, post.date)

            self.add(postItem)
        })
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

PostList.extends(Compo)