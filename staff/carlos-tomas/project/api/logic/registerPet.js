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

        try {
            const user = await User.findById(userId).lean()

            if (!user) {
                throw NotFoundError('user not found')
            }



            await Pet.create({ chip, name, race, sex, weight, sterilized, dateOfBirth })


        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('El chip del animal ya esta registrado')

            throw new SystemError(error.message)
        }
    })()
}