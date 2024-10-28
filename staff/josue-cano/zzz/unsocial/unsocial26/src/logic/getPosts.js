export default () => {
    
    //si no hay nada me creas una array vacia
    const users = JSON.parse(localStorage.users) || []
    

    const localPosts = localStorage.posts
    //si localposts existe o tiene un valor lo pasas a objeto o  creas una array vacio
    const posts = localPosts ? JSON.parse(localStorage.posts) :  []

    const { userId } = sessionStorage

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author =  authorId

        post.liked = post.likes.includes(userId)

        post.comments = post.comments.length
    })

    return posts.toReversed()
}