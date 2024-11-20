import { useState, useEffect } from 'react'

import './Comments.css'
import logic from '../../../logic'

import { Comment, AddComment } from './index'

export default function Comments(props) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    console.log('Comments -> useEffect "componentDidMount"')

    try {
      logic.getComments(props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setComments(comments)

      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  const handleRemoved = () => {
    try {
      logic.getComments(props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setComments(comments)
        props.onRemoved()

      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleAdded = () => {
    try {
      logic.getComments(props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        setComments(comments)
        props.onAdded()

      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  console.log('Render -> Comments')

  return (
    <section className="Comments">
      <ul>
        {comments.map(comment =>
          <Comment
            key={comment.id}
            postId={props.postId}
            comment={comment}
            onRemoved={handleRemoved} />)}
      </ul>

      <AddComment
        postId={props.postId}
        onAdded={handleAdded} />

    </section>
  )

}