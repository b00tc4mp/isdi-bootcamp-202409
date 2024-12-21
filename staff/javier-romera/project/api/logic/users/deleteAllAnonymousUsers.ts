import { errors } from 'com'
import { User } from 'dat'

const { SystemError } = errors

export default (): Promise<void> => {

    return (async (): Promise<void> => {
        try {
            await User.deleteMany({ role: 'anonymous' })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}