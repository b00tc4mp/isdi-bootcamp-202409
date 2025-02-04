import { User, LogBook } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

// Validate user and logbook
export default async (userId, logbookId) => {
  try {
    // Validate IDs
    try {
      validate.id(userId, 'userId');
      validate.id(logbookId, 'logbookId');
    } catch (validationError) {
      throw new SystemError(`Validation error: ${validationError.message}`);
    }

    let user, logbook;

    // Fetch the user and logbook
    try {
      [user, logbook] = await Promise.all([
        User.findById(userId).lean(),
        LogBook.findById(logbookId).lean(),
      ]);
    } catch (fetchError) {
      throw new SystemError(`Error fetching user or logbook: ${fetchError.message}`);
    }

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!logbook) {
      throw new NotFoundError('Logbook not found');
    }

    // Delete the logbook
    try {
      const deletedLogBook = await LogBook.findByIdAndDelete(logbookId);
      if (!deletedLogBook) {
        throw new NotFoundError('Logbook not found ');
      }
    } catch (deletionError) {
      throw new SystemError(`Error deleting logbook: ${deletionError.message}`);
    }

    // Return success message
    return { message: 'Logbook deleted successfully' };
  } catch (error) {
    console.error('Error in deleteLog:', error);
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new SystemError(error.message);
  }
};