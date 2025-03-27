import { storage, uuid } from '../data/index.js'
import validate from './helpers/validate.js'

export default (postId, text, userId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')
  validate.text(text)

  const { posts } = storage

  const post = posts.find(({ id }) => id === postId)

  if (!post) throw new Error('post not found')

  post.comments.push({
    id: uuid(),
    author: userId,
    text,
    date: new Date
  })

  storage.posts = posts

}