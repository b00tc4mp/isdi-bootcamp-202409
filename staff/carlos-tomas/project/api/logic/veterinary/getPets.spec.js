import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Pet } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors
import getPets from './getPets.js'

debugger

describe('getHistoriesPets', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))

    it('get pets', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })
        const pet = new Pet({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/11' })

        return Promise.all([user.save(), pet.save()])
            .then(([user, pet]) =>
                getPets(user.id,)
                    .then(pets => {
                        expect(pets[0].chip).to.equal(pet.chip)
                        expect(pets[0].name).to.equal(pet.name)
                        expect(pets[0].race).to.equal(pet.race)
                        expect(pets[0].weight).to.equal(pet.weight)
                        expect(pets[0].sterilized).to.equal(pet.sterilized)


                    })
            )

    })

    it('fails on non-existing user', () =>
        expect(
            getPets('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )


    after(() => db.disconnect())
})