import db from "../../dat/index.js"
import { validate } from "./helpers/index.js"

const { ObjectId } = db

export default (userId, postId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  const objectUserId = new ObjectId(userId)
  const objectPostId = new ObjectId(postId)

  return Promise.all([
    db.users.findOne({ _id: objectUserId }),
    db.posts.findOne({ _id: objectPostId })
  ])
    .catch(error => { throw new Error('user not found') })
    .then(([user, post]) => {
      if (!user) throw new Error('user not found')
      if (!post) throw new Error('post not found')

      const { likes } = post

      const found = likes.some(objectUserId => objectUserId.equals(userId))

      if (found)
        return db.posts.updateOne({ _id: objectPostId }, { $pull: { likes: objectUserId } })
          .catch(error => { throw new Error(error.message) })

      return db.posts.updateOne({ _id: objectPostId }, { $push: { likes: objectUserId } })
        .catch(error => { throw new Error(error.message) })

    })
    .then(_ => { })
}