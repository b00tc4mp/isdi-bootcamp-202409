import getPosts from '../../logic/getPosts'

function PostList() {
    console.log('Renderizamos el postList')

    let posts;

    try {
        posts = getPosts()

    } catch (error) {
        alert(error.message);
        console.error(error)
    }

    return <div>
        <h3>Posts</h3>
        {posts.map(post => <article>
            <h4>{post.author.username}</h4>
            <time>{post.date}</time>
            <img className='postFrame' src={post.image} style={{ width: '95%' }} />
            <p>{post.text}</p>
            {/* <p>Edit | Delete</p> */}
        </article>)
        }

    </div>
}

export default PostList