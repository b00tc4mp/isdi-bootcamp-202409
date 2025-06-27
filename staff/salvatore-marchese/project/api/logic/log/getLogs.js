import { User, LogBook } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId) => {
  // Validate the userId
  validate.id(userId, 'userId');
  
  // Fetch user and logs
  return Promise.all([
    User.findById(userId).lean(),
    LogBook.find({ diver: userId }).lean()
  ])
    .catch(error => {
      throw new SystemError(error.message);  // Handle any system errors
    })
    .then(([user, logs]) => {
      if (!user) throw new NotFoundError('User not found');  // Handle user not found error
      if (!logs) throw new NotFoundError('No logs found for the user');  // Handle no logs case

      return logs;  // Return the logs if everything is successful
    });
};