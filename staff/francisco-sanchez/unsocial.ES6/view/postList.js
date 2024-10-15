/**
 * 
 */

class PostList extends Compo {
    constructor() {
        super(document.createElement('div'))
        try {
            //Mostramos los posts en orden inverso
            let posts = getPosts().toReversed()

            posts.forEach(post => {
                const postItem = new Post(post.username, post.image, post.text, post.date)
                this.add(postItem)
            })

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }
}