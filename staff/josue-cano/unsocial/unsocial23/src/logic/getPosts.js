export default  () => {
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    posts.forEach(post => {

         //const authorId = post.author; es lo mismo
         //"Extrae la propiedad author de post y renómbrala como authorId".
        const { author: authorId} = post
    


    const { username } = users.find(({ id }) => id === authorId)
        
   
    post.author = { id: authorId, username}

});

return posts.toReversed()

}

