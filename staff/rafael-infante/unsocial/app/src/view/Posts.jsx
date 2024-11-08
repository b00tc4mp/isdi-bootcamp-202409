import { useState, useEffect } from "react"
import { Post } from "../components/functional/index"
import logic from "../logic"
import './Posts.css'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log(('Posts -> useEffect "componentDidMount"'))

    try {
      false && logic.getPosts((error, posts) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setPosts(posts)
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  const handleLiked = () => {
    try {
      false && logic.getPosts((error, posts) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setPosts(posts)
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleDeleted = () => {
    try {
      false && logic.getPosts((error, posts) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setPosts(posts)
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleCommentRemoved = () => {
    try {
      false && logic.getPosts((error, posts) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setPosts(posts)
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleCommentAdded = () => {
    try {
      false && logic.getPosts((error, posts) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setPosts(posts)
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  console.log('Posts -> render')

  return (
    <main className="Posts">
      {posts.map(post => <Post
        key={post.id}
        post={post}
        onLiked={handleLiked}
        onDeleted={handleDeleted}
        onCommentRemoved={handleCommentRemoved}
        onCommentAdded={handleCommentAdded} />)}
    </main>
  )
}