export default () => {
    const users = JSON.parse(localStorage.users)
    const posts = localStorage.posts ? JSON.parse(localStorage.posts) : []

    const { userId } = sessionStorage
    
        posts.forEach(post => {
            const { author: authorId } = post
    
            // Check if user is the owner of the post
            //const user = users.find(user => user.id === authorId)
            //const user = users.find(({ id }) => id === authorId)
            const  { username } = users.find(({ id, username }) => username === authorId)

            //if result is not undefined then try and get the username else return 
    
            //post.author = {id: authorId, username: username }
            post.author = { id: authorId, username }
    
            post.like = post.likes.includes(userId)

           post.comments = post.comments.length
        })

        return posts.toReversed()
    }

    

