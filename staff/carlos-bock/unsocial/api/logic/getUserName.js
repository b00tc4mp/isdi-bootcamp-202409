import {storage} from '../data/index.js';
import { validate } from 'com'

const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId');
    validate.id(targetUserId, 'targetUserId');

    const {users} = storage;
    
    const found = users.some(({id} ) => id === userId)

    if (!found) throw new Error('use not found');

    const user = users.find(({ id }) => id === targetUserId)

    if (!user) throw new Error('user not found');

    return user.name;
}

export default getUserName;
