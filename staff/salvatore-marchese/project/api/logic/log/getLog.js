import { User, LogBook as Log } from 'dat';
import { validate, errors } from 'com';

const { NotFoundError, SystemError } = errors;

export default (userId, logId) => {
  validate.id(userId, 'userId')
  validate.id(logId, 'logId')

  return (async () => {
    // Fetch the user
    let user, log

    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError(`Error fetching user: ${error.message}`);
    }

    if (!user) throw new NotFoundError('User not found');

    // Fetch the log
    
    try {
      log = await Log.find({ diver: userId, _id: logId }).lean();
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!log || log.length === 0) throw new NotFoundError('Log not found');


    return log;  // Return the found log
  })()
}
