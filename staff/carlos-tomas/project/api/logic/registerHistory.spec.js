import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Pet, History } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import registerHistory from './registerHistory.js'

debugger

describe('registerHistory', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Pet.deleteMany(), History.deleteMany()]))

    it('register history from pet', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })
        const pet = new Pet({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/09' })

        return Promise.all([user.save(), pet.save()])
            .then(([user, pet]) =>
                registerHistory(user.id, pet.id, "internal_medicine", "test de register historial")
                    .then(() => History.findOne({ type: "internal_medicine" }))
                    .then(history => {

                        expect(history.type).to.equal("internal_medicine")
                        expect(history.text).to.equal("test de register historial")
                    })
            )
    })

    it('fails on non-existing user', () => {
        const pet = new Pet({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/09' })
        return pet.save()
            .then(() => {
                expect(
                    registerHistory('012345678901234567890123', pet.id, "internal_medicine", "test")
                ).to.be.rejectedWith(NotFoundError, /^user not found$/)
            })
    })

    it('fails on non -existing pet', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })

        return user.save()
            .then(() => {
                expect(
                    registerHistory(user.id, '012345678901234567890123', "internal_medicine", "test")
                ).to.be.rejectedWith(NotFoundError, /^pet not found$/)
            })
    })


    after(() => db.disconnect())
})