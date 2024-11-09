import { useState, useEffect } from "react";

import Post from "../components/functional/Post";
import "./Posts.css";

import logic from "../logic";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Posts -> componentDidMount");
    try {
      false &&
        logic.getPosts((error, posts) => {
          if (error) {
            alert(error.message);

            console.error(error);

            return;
          }
          setPosts(posts);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  }, []);

  const handleLiked = () => {
    try {
      false &&
        logic.getPosts((error, posts) => {
          if (error) {
            alert(error.message);

            console.error(error);

            return;
          }
          setPosts(posts);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleDeleted = () => {
    try {
      false &&
        logic.getPosts((error, posts) => {
          if (error) {
            alert(error.message);

            console.error(error);

            return;
          }
          setPosts(posts);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleCommentAdded = () => {
    try {
      false &&
        logic.getPosts((error, posts) => {
          if (error) {
            alert(error.message);

            console.error(error);

            return;
          }
          setPosts(posts);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleCommentRemoved = () => {
    try {
      false &&
        logic.getPosts((error, posts) => {
          if (error) {
            alert(error.message);

            console.error(error);

            return;
          }
          setPosts(posts);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  console.log("Posts -> render");

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLiked={handleLiked}
          onDeleted={handleDeleted}
          onCommentAdded={handleCommentAdded}
          onCommentRemoved={handleCommentRemoved}
        />
      ))}
    </div>
  );
}
