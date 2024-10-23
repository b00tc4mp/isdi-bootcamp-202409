import './PostList.css'

import getPosts from '../../logic/getPosts'
import deletePost from '../../logic/deletePost'
import LikeButton from '../library/LikeButton'
import Button from '../library/Button'

function PostList(props) {
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div className="PostList">
        <h3>Posts</h3>
        <div>
            {posts.map(post => <article>
                <h4>{post.author.username}</h4>
                <img src={post.image} />
                <p>{post.text}</p>
                <time>{post.date}</time>
                <LikeButton post />
                {sessionStorage.loggedInUserId === post.author.id && <Button type="button" className="deleteButton" onClick={() => {
                    deletePost(post)
                    props.onDeleted()
                }}>Delete</Button>}
            </article>)}
        </div>
    </div>
}

export default PostList