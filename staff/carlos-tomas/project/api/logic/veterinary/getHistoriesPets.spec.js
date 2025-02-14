import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Pet, History } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors
import getHistoriesPets from './getHistoriesPets.js'

debugger

describe('getHistoriesPets', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Pet.deleteMany(), History.deleteMany()]))

    it('register animal type history', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })
        const pet = new Pet({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/09' })
        const history = new History({ type: "internal_medicine", pet: pet.id, veterinary: user.id, text: 'Test' })


        return Promise.all([user.save(), pet.save(), history.save()])
            .then(([user, pet, history]) =>
                getHistoriesPets(user.id, "internal_medicine", pet.id)
                    .then(histories => {

                        expect(histories[0].id).to.equal(history.id)
                        expect(histories[0].type).to.equal("internal_medicine")
                        expect(histories[0].text).to.equal(history.text)
                    })
            )

    })

    it('fails on non-existing user', () => {
        const pet = new Pet({ chip: '012345678912345', name: 'Peke', race: 'Meztizo', sex: true, weight: 35, sterilized: true, dateOfBirth: '2018/09/09' })
        return pet.save()
            .then(() => {
                expect(
                    getHistoriesPets('012345678901234567890123', "internal_medicine", pet.id)
                ).to.be.rejectedWith(NotFoundError, /^user not found$/)
            })

    })

    it('fails on non -existing pet', () => {
        const user = new User({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })

        return user.save()
            .then(() => {
                expect(
                    getHistoriesPets(user.id, "internal_medicine", '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, /^pet not found$/)
            })
    })

    after(() => db.disconnect())
})