/* import { User, LogBook } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

export default async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('User not found')
  
    const logs = await LogBook.find({ diver: userId })
    return logs 
  }
 */

import { User, LogBook } from 'dat';
import { errors } from 'com';

const { NotFoundError, SystemError } = errors;

export default async (userId) => {
  try {
    // Fetch the user
    let user;
    try {
      user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new SystemError(`Error fetching user: ${error.message}`);
    }

    // Fetch the logs
    try {
      const logs = await LogBook.find({ diver: userId });
      return logs;
    } catch (error) {
      throw new SystemError(`Error fetching logs: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in getLogs:', error);
    throw error;
  }
};