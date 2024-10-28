import uuid from "../data/uuid"
import logic from "."

const createPost = (image, text) => {
  if (typeof image !== 'string') throw new Error
  if (typeof text !== 'string') throw new Error

  const posts = JSON.parse(localStorage.posts)

  const post = {
    id: uuid(),
    image: image,
    text: text,
    author: logic.getUserId(),
    date: new Date,
    likes: []
  }

  posts.push(post)

  localStorage.posts = JSON.stringify(posts)
}

export default createPost