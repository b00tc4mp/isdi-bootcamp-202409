import db from 'dat'
import { validate } from 'com/index.js'

const { ObjectId } = db

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  return db.users.findOne({ _id: new ObjectId(userId) })
    .catch(error => { throw new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.find()
    })
  const { users, posts } = storage

  const found = users.some(({ id }) => id === userId)

  if (!found) throw new Error('user not found')

  const post = posts.find(({ id }) => id === postId)

  if (!post) throw new Error('post not found')

  const { comments } = post

  comments.forEach(comment => {
    const { author: authorId } = comment

    const { username } = users.find(({ id }) => id === authorId)

    comment.author = { id: authorId, username }
  })

  return comments
}

