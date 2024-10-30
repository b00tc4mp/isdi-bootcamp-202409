import { users } from "../data/index.js";
import validate from "./helpers/validate.js";

export default userId => {
  validate.id(userId, 'userId')
  const user = users.find(user => user.id === userId)

  if (!user) throw new Error('user not found')

  return user.name
}