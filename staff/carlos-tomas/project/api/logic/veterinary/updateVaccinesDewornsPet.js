import { User, Pet } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, DuplicityError } = errors

export default (userId, petId, vaccineName, dewornData) => {
    validate.id(userId, 'userId')
    validate.id(petId, 'petId')

    if (vaccineName) {
        validate.vaccineName(vaccineName)
    }
    if (dewornData) {
        validate.deworn(dewornData)
    }
    return (async () => {

        let user

        try {
            user = await User.findById(userId).lean()

        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('user not found')

        let pet

        try {
            pet = await Pet.findById(petId);

        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!pet) throw new NotFoundError('pet not found')


        if (vaccineName) {
            const isVaccineDuplicated = pet.vaccines.some(vaccine => vaccine.name === vaccineName);
            if (isVaccineDuplicated) {
                throw new DuplicityError(`La vacuna "${vaccineName}" ya ha sido administrada al Animal.`)
            }
            const vaccine = { name: vaccineName }
            pet.vaccines.push(vaccine)
        }

        if (dewornData) {
            const isExistingDeworn = pet.deworns.some(deworn => deworn.type === dewornData);
            if (isExistingDeworn) {
                throw new DuplicityError(`La desparacitación de tipo '${dewornData}' ya está registrada.`)
            }
            if (dewornData === 'both') {

                const hasExternal = pet.deworns.some(deworn => deworn.type === 'external');
                const hasInternal = pet.deworns.some(deworn => deworn.type === 'internal');
                if (hasExternal || hasInternal) {
                    throw new DuplicityError("No se puede agregar 'Ambas' si ya se han administrado 'external' o 'internal'.")
                }
            } else if (dewornData === 'external' || dewornData === 'internal') {
                const hasBoth = pet.deworns.some(deworn => deworn.type === 'both')
                if (hasBoth) {
                    throw new DuplicityError(`No se puede agregar '${dewornData}' porque ya está registrado 'both'.`)
                }
            }

            const deworn = { type: dewornData }

            pet.deworns.push(deworn)
        }

        try {
            await pet.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
