import getPosts from  '../../logic/getPosts'

function PostList() {
    console.log('PostList ->')

    let posts 

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>
        <h3>Posts</h3>

        {posts.map(post=> <article>
            <h4>{post.author.username}</h4>
            <img src= {post.image} style={{ width: '100%'}}/>
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}

export default PostList