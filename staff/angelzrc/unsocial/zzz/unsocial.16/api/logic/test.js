import db from 'dat'

const { ObjectId } = db
const user = db.users.findOne({ _id: ObjectId.createFromHexString('672cdaaafcf48026d6c1c192') })/* .toString() */

console.log(user)