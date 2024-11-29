import { validate, errors } from 'com'

const { SystemError } = errors

import { storage } from '../data'

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  const { users, posts } = storage

  const user = users.find(({ id }) => id === userId)

  if (!user) throw new Error('user not found')

  const post = posts.find(({ id }) => id === postId)

  if (!post) throw new Error('post not found')

  const { savedPosts } = user

  const index = savedPosts.indexOf(postId)

  if (index < 0)
    savedPosts.push(postId)
  else
    savedPosts.splice(index, 1)

  storage.users = users
}