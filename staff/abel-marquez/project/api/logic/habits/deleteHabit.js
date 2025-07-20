import { Habit, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, habitId) => {
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');

    return Promise.all([
        User.findById(userId).lean(),
        Habit.findById(habitId).lean()
    ])
        .catch(error => { throw new SystemError(error.message); })
        .then(([user, habit]) => {
            if (!user) throw new NotFoundError('user not found');
            if (!habit) throw new NotFoundError('habit not found');
            if (habit.user.toString() !== userId) throw new OwnershipError ('habit does not belong to the user');

            return Habit.findByIdAndDelete(habitId)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(() => { }); // Successful deletion
};

      