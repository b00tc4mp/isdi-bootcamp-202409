const getPosts = () => {
   
    //si no hay nada me creas una array vacia
    const users = JSON.parse(localStorage.users) || []
    

    const localPosts = localStorage.posts
    //si localposts existe o tiene un valor lo pasas a objeto o  creas una array vacio
    const posts = localPosts ? JSON.parse(localStorage.posts) :  []



    posts.forEach(post => {

         //const authorId = post.author; es lo mismo
         //"Extrae la propiedad author de post y renómbrala como authorId".
        const { author: authorId} = post

        post.author = authorId

});

return posts.toReversed()

}

export default getPosts