import { User } from 'dat'
import { Error } from 'com';

// UPDATE USER DATA
export async function updateUser(userId, data) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('user not found');

        //TODO - Optional
        //Remove the above code and pass the entire data

        //Update the user data
        //TODO - Update to update the other data
        const dataToBeUpdated = {
            name: data.name || user.name,
            email: data.email || user.email
        }

        User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true })
            .then(updatedUser => {
                if (updatedUser) return updateUser
                else throw new Error('User not found');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    } catch (error) {
        console.log(error)
        throw new SystemError(error.message)
    }
}