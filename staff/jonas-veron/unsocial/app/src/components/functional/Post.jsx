import { useState } from "react";
import { Button } from "../library";
import Comments from "./Comments";
import { getElapsedTime } from "../../utils/index.js";
import logic from "../../logic";
import "./Post.css";

export default function Post({
  post,
  onLiked,
  onDeleted,
  onCommentAdded,
  onCommentRemoved,
}) {
  console.log("Post -> constructor");
  const [view, setView] = useState(null);

  const { id, author, image, text, date, liked, likes, comments } = post;

  const handleLikeClick = () => {
    try {
      logic
        .toggleLikePost(id)
        .then(onLiked)
        .catch((error) => {
          alert(error.message);

          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleCommentsClick = () => {
    setView(view ? null : "comments");
  };

  const handleDeleteClick = () => {
    if (confirm("Estas seguro de eliminar este post ?")) {
      try {
        logic
          .deletePost(id)
          .then(onDeleted)
          .catch((error) => {
            alert(error.message);
            console.error(error);
          });
      } catch (error) {
        alert(error.message);

        console.error(error);
      }
    }
  };

  console.log("Post -> render");

  return (
    <article className="Post">
      <div className="usernameAndDeleteButton">
        <h4 className="postUserNameTitle">{author.username}</h4>
        {author.id === logic.getUserId() && (
          <Button className="deletePostButton" onClick={handleDeleteClick}>
            ❌
          </Button>
        )}
      </div>
      <img src={image} />
      <div className="postItemButtons">
        <div>
          <Button className="likePostButton" onClick={handleLikeClick}>
            {`${liked ? "❤️" : "🤍"} ${likes} likes`}
          </Button>
        </div>

        <div>
          <Button className="commentPostButton" onClick={handleCommentsClick}>
            💬{comments} comments
          </Button>
        </div>
      </div>
      <p>
        <b>{author.username}</b> {text}
      </p>

      <time>{getElapsedTime(date)} ago</time>

      {logic.getUserRole() === "moderator" && <Button>💀</Button>}

      {view === "comments" && (
        <Comments
          postId={id}
          onAdded={onCommentAdded}
          onRemoved={onCommentRemoved}
        />
      )}
    </article>
  );
}
