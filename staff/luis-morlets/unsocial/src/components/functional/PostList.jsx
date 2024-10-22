import getPosts from '../../logic/getPosts'
import LikeButton from '../library/LikeButton'
import deletePost from '../../logic/deletePost'

function PostList(props) {

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>
        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author.username}</h4>
            <img src={post.image} style={{ width: '100%' }} />
            <div>
                <LikeButton postData={post} loggedInUserId={sessionStorage.loggedInUserId} />
                {sessionStorage.loggedInUserId === post.author.id && <button type="button" onClick={() => {
                    deletePost(post)
                    props.onDeleted()
                }}>Delete Post</button>
                }
            </div>
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}

export default PostList