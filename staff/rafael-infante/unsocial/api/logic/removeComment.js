import { validate } from "./helpers/index.js"
import { storage } from "../data/index.js"

export default (userId, postId, commentId) => {
  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  const { posts } = storage

  const post = posts.find(post => post.id === postId)

  const { comments } = post

  const index = comments.findIndex(comment => comment.id === commentId)

  if (index < 0) throw new Error('comment not found')

  const { author } = comments[index]

  if (author !== userId) throw new Error('user is not found')

  comments.splice(index, 1)

  storage.posts = posts
}