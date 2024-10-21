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
            {/* <h4>{getUserUserName(post.author)}</h4> */}
            {/* <h4>{getUserName(post.author)}</h4> */}
            <img src={post.image} style={{ width: '95%' }} />
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)
        }

    </div>
}

export default PostList