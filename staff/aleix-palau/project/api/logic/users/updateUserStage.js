import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, stage) => {
    validate.id(userId, 'userId')
    validate.stage(stage)

    return (async () => {
        let user

        try {
            user = await User.findByIdAndUpdate(
                userId,
                { $set: { stage } }, // Updates only the stage field
                { new: true, runValidators: true } // 'new: true' -> Mongoose returns the updated doc (default returns original doc)
                // 'runValidators: true' -> the update respects the validation rules in my schema ('name-dob', 'gender', etc.)
            )
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')
    })()
}