/**
 * 
 */

class PostList extends Compo {
    constructor() {
        super(document.createElement('div'))
        try {
            //Mostramos los posts en orden inverso
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