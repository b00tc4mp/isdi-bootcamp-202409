import { useState } from 'react';

import { Button } from '../library';
import Comments from './Comments';

import logic from '../../logic';

import util from '../../util';
const { getElapsedTime } = util;

import './Post.css';

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
  const [view, setView] = useState(null);

  const {
    id,
    author,
    image,
    text,
    date,
    liked,
    likes,
    comments
  } = post;


  const handleLikeClick = () => {
    try {
      logic.toggleLikePost(id, error => {
        if (error) {
          alert(error.message);

          console.error(error);

          return;
        }

        onLiked();
      })
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  }

  const handleDeleteClick = () => {
    if (confirm('Delete post?')) {
      try {
        logic.deletePost(id)
          .then(onDeleted)
          .catch(error => {
            alert(error.message)

            console.error(error)
          })
      } catch (error) {
        alert(error.message);

        console.error(error);
      };
    };
  };

  const handleCommentClick = () => setView(view ? null : 'comments');

  console.log('Post -> render');

  return <article className="Post">
    <h4>{author.username}</h4>

    <img src={image} />

    <p>{text}</p>

    <time>{getElapsedTime(date)} ago</time>

    <Button onClick={handleLikeClick}> {`${liked ? '💓' : '🖤'} ${likes} likes`}</Button>

    {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

    <Button onClick={handleCommentClick}>💬 {comments} comments</Button>

    {/* {logic.getUserRole() === 'moderator' && <Button>💀</Button>} */}
    {logic.isUserRoleModerator() && <Button>💀</Button>}


    {view === 'comments' && <Comments
      postId={id}
      onAdded={onCommentAdded}
      onRemoved={onCommentRemoved}
    />}
  </article>
};
