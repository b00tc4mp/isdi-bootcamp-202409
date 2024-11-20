import { useState, useEffect } from "react"
import { Post } from "./components/functional/index"
import logic from "../logic"
import './Home.css'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log(('Posts -> useEffect "componentDidMount"'))

    try {
      logic.getPosts((error, posts) => {
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
      logic.getPosts((error, posts) => {
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
      logic.getPosts((error, posts) => {
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
      logic.getPosts((error, posts) => {
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
      logic.getPosts((error, posts) => {
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
    <main className="Home pt-12 pb-12 flex items-center justify-center flex-col  bg-white">
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