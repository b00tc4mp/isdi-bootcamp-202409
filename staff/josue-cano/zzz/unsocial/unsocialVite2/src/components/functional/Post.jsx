import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { likePost, isFan } from '../logic/getPosts';
// import { useState } from 'react'



const Post = function ({ post, usuarioActual, onLiked }) {

    return (
        <article>
            <h4>{post.username}</h4>
            <img src={post.image} style={{ width: "100%" }} alt="Post image" />
            <div className='botones'>

                <button className="like" type="button" title="me gusta"
                    onClick={() => onLiked(post.id, usuarioActual)}
                >
                    <FontAwesomeIcon icon={isFan(post.id, usuarioActual) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                    &nbsp;{post.fans.length}
                </button>
                <button className='message'><FontAwesomeIcon icon="fa-regular fa-message" /></button>

            </div>
            <p>{post.text}</p>
            <time>{new Date(post.date).toDateString()}</time>
        </article>
    );
};



export default Post;
