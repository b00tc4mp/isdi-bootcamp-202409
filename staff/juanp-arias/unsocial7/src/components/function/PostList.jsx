import getPosts from '../../logic/getPosts'
import getUserUsername from '../../logic/getUserUsername'
function PostList() {

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>
        <h3>POSTS</h3>

        {posts.map(post => <div className="post-container">
            <h4>{getUserUsername(post.author)}</h4>
            <img src={post.image} style={{ width: "100%" }} />
            <span>😊</span>
            <p>{post.text}</p>
            <time>{post.date}</time>
        </div>)}
    </div>
}
export default PostList