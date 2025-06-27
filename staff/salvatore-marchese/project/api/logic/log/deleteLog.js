import { User, LogBook } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

// Validate user and logbook
export default (userId, logbookId) => {
  validate.id(userId, 'userId');
  validate.id(logbookId, 'logbookId');


  // Fetch the user and logbook
  return (async () => {
    let user, logbook

    try {
      [user, logbook] = await Promise.all([
        User.findById(userId).lean(),
        LogBook.findById(logbookId).lean(),
      ]);
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!logbook) {
      throw new NotFoundError('Logbook not found');
    }

    // Delete the logbook
    try {
      await LogBook.findByIdAndDelete(logbookId);
    } catch (error) {
      throw new SystemError(error.message);
    }
  })()
};