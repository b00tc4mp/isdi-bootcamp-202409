import { useState, useEffect } from 'react'

import { Post } from './components'

import logic from '../logic'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('Posts -> useEffect "componentDidMount"')

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

  console.log('Home -> render')

  return <div className="flex justify-center flex-col">
    {posts.map(post => <Post
      key={post.id}
      post={post}
      onLiked={handleLiked}
      onDeleted={handleDeleted}
      onCommentAdded={handleCommentAdded}
      onCommentRemoved={handleCommentRemoved}
    />)}
  </div>
}
