import { User, LogBook as Log } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

export default async (userId, logId) => {
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('User not found')

    const log = await Log.find({diver:userId,_id:logId})
    console.log("log en el logic",log)
    return log 

}