import { User, Pet } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError, DuplicityError } = errors;

export default (userId, petId, vaccineName, dewornData) => {
    validate.id(userId, 'userId');
    validate.id(petId, 'petId');

    return (async () => {
        try {

            const user = await User.findById(userId).lean();
            if (!user) throw new NotFoundError('user not found');

            const pet = await Pet.findById(petId);
            if (!pet) throw new NotFoundError('pet not found');

            // Validar duplicidad de vacuna
            const isVaccineDuplicated = pet.vaccines.some(vaccine => vaccine.name === vaccineName);
            if (isVaccineDuplicated) {
                throw new DuplicityError(`La vacuna "${vaccineName}" ya ha sido administarda al Animal.`);
            }

            // Añadir vacuna
            const vaccine = { name: vaccineName };
            pet.vaccines.push(vaccine);

            // Añadir desparasitante si existe
            if (dewornData) {
                const deworn = { type: dewornData };
                pet.deworns.push(deworn);
            }

            // Guardar los cambios
            await pet.save();

            return { message: 'Vaccines and deworns updated successfully.' };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof DuplicityError) {
                throw error;
            }
            throw new SystemError(error.message);
        }
    })();
};
