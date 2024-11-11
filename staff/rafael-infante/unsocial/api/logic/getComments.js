import db from "../../dat/index.js"
import { validate } from "./helpers/index.js"

const { ObjectId } = db

export default (userId, postId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { throw new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          const { comments } = post

          const promises = comments.map(comment => {
            const { author: authorId } = comment

            return db.users.findOne({ _id: authorId }, { username: 1 })
              .then(user => {
                if (!user) throw new Error('user not found')

                const { username } = user

                comment.author = { id: authorId, username }

                comment.id = comment._id.toString()
                delete comment._id

                return comment
              })
          })

          return Promise.all(promises)
        })
    })
}