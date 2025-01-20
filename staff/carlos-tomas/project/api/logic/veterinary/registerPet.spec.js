import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Pet } from 'dat'
import { errors } from 'com'

const { DuplicityError, NotFoundError } = errors

import registerPet from './registerPet.js'

describe('registerPet', () => {

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))

    it('register animal with user', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com', passwordRepeat: '123123123' })

        return user.save()
            .then((user) =>
                registerPet(user.id, '012345678912345', 'Peke', 'Meztizo', true, 35, true, '2018/09/09')
                    .then(() => Pet.findOne({ chip: '012345678912345' }))
                    .then(pet => {
                        expect(pet).to.exist
                        expect(pet.chip).to.have.lengthOf(15)
                        expect(pet.name).to.equal('Peke')
                        expect(pet.race).to.equal('Meztizo')
                        expect(pet.sex).to.be.a("boolean")
                        expect(pet.weight).to.be.a("number")
                        expect(pet.sterilized).to.be.a("boolean")
                        expect(pet.dateOfBirth).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            registerPet('012345678901234567890123', '012345678912347', 'Peke', 'Meztizo', true, 35, true, '2018/09/09')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on existing pet', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })

        return user.save()
            .then(() => {

                return Pet.create({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/09' })
            })
            .then(() => {

                return expect(
                    registerPet(user.id, '012345678912345', 'Peke', 'Meztizo', true, 35, true, '2018/09/09')
                ).to.be.rejectedWith(DuplicityError, 'El chip del animal ya está registrado')
            })
    })

    after(() => db.disconnect())

})