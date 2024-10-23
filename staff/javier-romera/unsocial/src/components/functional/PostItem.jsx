import { Button } from '../library'

import logic from '../../logic'

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likedBy }, onLikeClicked, onDeletedPost }, key) {
    const { loggedInUserId } = sessionStorage
    return <article key={key} className="PostItem">
        <div className="post-header">
            <h4>{author.username}</h4>

            {loggedInUserId === author.id && <Button classname="delete-button" type="button" onClick={() => {
                logic.deletePost(id)

                onDeletedPost()
            }}>❌</Button>}
        </div>

        <img src={image}></img>

        <div className="likes-div">
            <Button classname="like-button" onClick={() => {
                logic.toggleLikePost(id)

                onLikeClicked()
            }}>{`${liked ? '❤️' : '🤍'}`}</Button>

            <span>{likedBy.length}</span>
        </div>

        <p className="caption">{text}</p>

        <p>View comments...</p>

        <time>{date}</time>
    </article>
}

export default PostItem