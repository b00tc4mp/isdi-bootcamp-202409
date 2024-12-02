import { useState, useEffect } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import logic from '../../logic'

export default function Comments(props) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    try {
      //TODO logic.getComments(props.productId)
      // .then(setComments)
      // .catch(error => {
      //   alert(error.message)

      //   console.error(error)
      // })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }, [])

  return <section>
    <ul>
      TODO map de comments
    </ul>
  </section>
}