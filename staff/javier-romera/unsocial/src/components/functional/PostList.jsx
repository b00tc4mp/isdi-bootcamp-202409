import './PostList.css'

import logic from '../../logic'

import LikeButton from '../library/LikeButton'
import Button from '../library/Button'

function PostList(props) {
    let posts

    try {
        posts = logic.getPosts()
    } catch (error) {
        alert(error.message)
        console.error(error)
    }

    return <section className="PostList">
        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author.username}</h4>
            <img src={post.image} />
            <div>
                <LikeButton id={sessionStorage.loggedInUserId} post={post} />
            </div>
            <p>{post.text}</p>
            <time>{post.date}</time>
            <p className="comments-p">View comments..</p>
            {sessionStorage.loggedInUserId === post.author.id && <Button type="button" classname="delete-button" onClick={() => {
                logic.deletePost(post)

                props.onDeletedPost()
            }}>Delete Post</Button>}
        </article>)}
    </section>
}

export default PostList