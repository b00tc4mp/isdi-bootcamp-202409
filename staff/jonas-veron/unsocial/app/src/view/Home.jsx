import { useState, useEffect } from "react";

import Post from "../components/functional/Post";
import "./Home.css";

import logic from "../logic";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Home -> componentDidMount");
    try {
      logic
        .getPosts()
        .then(setPosts)
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  }, []);

  const handleLiked = () => {
    try {
      logic
        .getPosts()

        .then(setPosts)
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleDeleted = () => {
    try {
      logic
        .getPosts()

        .then(setPosts)
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleCommentAdded = () => {
    try {
      logic
        .getPosts()

        .then(setPosts)
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleCommentRemoved = () => {
    try {
      logic
        .getPosts()

        .then(setPosts)
        .catch((error) => {
          alert(error.message);
          console.error(error);
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
