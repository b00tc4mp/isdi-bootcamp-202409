import getLog from '../log/getLog.js'; 
import { User, LogBook as Log } from 'dat';
import { errors } from 'com';

const { NotFoundError } = errors;

describe('getLog', () => {
  const userId = '676310ec365df2fb2590cf5e';
  const logId = '6765d2b1da01678bbab8b023';

  beforeEach(() => {
    // Reset any static state before each test
    User.findById = async (id) => {
      if (id === userId) {
        return { _id: id, name: 'Test User' };
      }
      return null;
    };

    Log.find = async (query) => {
      if (query.diver === userId && query._id === logId) {
        return [{ _id: logId, diver: userId, depth: 30, time: 45 }];
      }
      return [];
    };
  });

  it('should return the log if the user and log exist', async () => {
    const result = await getLog(userId, logId);

    expect(result).toEqual([
      {
        _id: logId,
        diver: userId,
        depth: 30,
        time: 45,
      },
    ]);
  });

  it('should throw NotFoundError if the user does not exist', async () => {
    User.findById = async () => null; // Simulate user not found

    await expect(getLog(userId, logId)).rejects.toThrow(NotFoundError);
    await expect(getLog(userId, logId)).rejects.toThrow('User not found');
  });

  it('should return an empty array if the log does not exist for the user', async () => {
    Log.find = async () => []; // Simulate log not found

    const result = await getLog(userId, logId);
    expect(result).toEqual([]);
  });

  it('should return an empty array if the log exists but belongs to another user', async () => {
    Log.find = async (query) => {
      if (query.diver !== userId) {
        return [];
      }
    };

    const result = await getLog('anotherUserId', logId);
    expect(result).toEqual([]);
  });

  it('should handle database errors gracefully', async () => {
    User.findById = async () => {
      throw new Error('Database error');
    };

    await expect(getLog(userId, logId)).rejects.toThrow('Database error');
  });
});