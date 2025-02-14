import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db, { User, Pet } from 'dat';
import { errors } from 'com';
import updateVaccinesDewornsPet from './updateVaccinesDewornsPet.js';

chai.use(chaiAsPromised);
const { expect } = chai;

const { DuplicityError, NotFoundError } = errors;

describe('updateVaccinesDewornsPet', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(() => Promise.all([User.deleteMany(), Pet.deleteMany()]));

    it('adds a new vaccine to a pet', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [],
            deworns: [],
        }).save();

        await updateVaccinesDewornsPet(user.id, pet.id, 'Rabies', null);

        const updatedPet = await Pet.findById(pet.id);
        expect(updatedPet.vaccines).to.have.lengthOf(1);
        expect(updatedPet.vaccines[0].name).to.equal('Rabies');
    });

    it('throws DuplicityError if vaccine already exists', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [{ name: 'Rabies' }],
            deworns: [],
        }).save();

        await expect(updateVaccinesDewornsPet(user.id, pet.id, 'Rabies', null)).to.be.rejectedWith(
            DuplicityError,
            'La vacuna "Rabies" ya ha sido administrada al Animal.'
        );
    });

    it('adds a new deworn treatment', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [],
            deworns: [],
        }).save();

        await updateVaccinesDewornsPet(user.id, pet.id, null, 'internal');

        const updatedPet = await Pet.findById(pet.id);
        expect(updatedPet.deworns).to.have.lengthOf(1);
        expect(updatedPet.deworns[0].type).to.equal('internal');
    });

    it('throws DuplicityError if deworn treatment already exists', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [],
            deworns: [{ type: 'internal' }],
        }).save();

        await expect(updateVaccinesDewornsPet(user.id, pet.id, null, 'internal')).to.be.rejectedWith(
            DuplicityError,
            "La desparacitación de tipo 'internal' ya está registrada."
        );
    });

    it('throws DuplicityError when adding "both" if "external" or "internal" already exists', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [],
            deworns: [{ type: 'internal' }],
        }).save();

        await expect(updateVaccinesDewornsPet(user.id, pet.id, null, 'both')).to.be.rejectedWith(
            DuplicityError,
            "No se puede agregar 'Ambas' si ya se han administrado 'external' o 'internal'."
        );
    });

    it('throws DuplicityError when adding "external" or "internal" if "both" already exists', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
            vaccines: [],
            deworns: [{ type: 'both' }],
        }).save();

        await expect(updateVaccinesDewornsPet(user.id, pet.id, null, 'external')).to.be.rejectedWith(
            DuplicityError,
            "No se puede agregar 'external' porque ya está registrado 'both'."
        );

        await expect(updateVaccinesDewornsPet(user.id, pet.id, null, 'internal')).to.be.rejectedWith(
            DuplicityError,
            "No se puede agregar 'internal' porque ya está registrado 'both'."
        );
    });

    it('fails when user does not exist', async () => {
        const fakeUserId = '012345678901234567890123';
        const pet = await new Pet({
            chip: '012345678912345',
            name: 'Peke',
            race: 'Meztizo',
            sex: true,
            weight: 35,
            sterilized: true,
            dateOfBirth: new Date('2018-09-09'),
        }).save();

        await expect(updateVaccinesDewornsPet(fakeUserId, pet.id, 'Rabies', null)).to.be.rejectedWith(
            NotFoundError,
            'user not found'
        );
    });

    it('fails when pet does not exist', async () => {
        const user = await new User({
            name: 'Carlos Tomas',
            username: 'ctcarlos25',
            password: '123123123',
            phone: '+34682519205',
            email: 'ctcarlos25@gmail.com',
        }).save();

        const fakePetId = '012345678901234567890123';

        await expect(updateVaccinesDewornsPet(user.id, fakePetId, 'Rabies', null)).to.be.rejectedWith(
            NotFoundError,
            'pet not found'
        );
    });

    after(() => db.disconnect());
});
