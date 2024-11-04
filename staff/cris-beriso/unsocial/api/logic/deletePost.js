import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  const { users, posts } = storage //necesito tambien sacar los users.

  const found = users.some(({ id }) => id === userId)

  if (!found) throw new Error('user not found')

  const index = posts.findIndex(({ id }) => id === postId)

  if (index < 0) throw new Error('post not found')

  const post = posts[index]

  const { author } = post

  if (author !== userId) throw new Error('user is not the author of the post')

  posts.splice(index, 1)

  storage.posts = posts
}