import { User, Pet } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, DuplicityError } = errors

export default (userId, chip, name, race, sex, weight, sterilized, dateOfBirth) => {
    validate.id(userId, 'userId')
    validate.chip(chip)
    validate.name(name)
    validate.race(race)
    validate.sex(sex)
    validate.weight(weight)
    validate.sterilized(sterilized)
    validate.dateOfBirth(dateOfBirth)

    return (async () => {
        let user
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) {
            throw new NotFoundError('user not found')
        }
        try {

            await Pet.create({ chip, name, race, sex, weight, sterilized, dateOfBirth })


        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('El chip del animal ya está registrado')

            throw new SystemError(error.message)
        }
    })()
}