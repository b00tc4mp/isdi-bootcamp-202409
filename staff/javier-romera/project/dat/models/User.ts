import { model } from 'mongoose'

import { TUser } from '../types/index.js'
import { user } from '../schemas/index.js'

const User = model<TUser>('User', user, 'users')

export default User