import db from "../../dat/index.js";
import validate from "./helpers/validate.js";

const { ObjectId } = db

export default (userId, targetUserId) => {
  validate.id(userId, 'userId')
  validate.id(targetUserId, 'targetUserId')

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.users.findOne({ _id: ObjectId.createFromHexString(targetUserId) })
        .catch(error => { new Error(error.message) })
    })
    .then(user => {
      if (!user) throw new Error('target user not found')

      return user.name
    })

}