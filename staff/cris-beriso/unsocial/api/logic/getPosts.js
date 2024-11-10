import db from 'dat'
import { validate } from 'com/index.js'

const { ObjectId } = db

export default userId => {
  validate.id(userId)

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.find().forEach(post => { console.log(post) })
        .catch((error) => {
          throw new Error(error.message)
        })
    })
}
