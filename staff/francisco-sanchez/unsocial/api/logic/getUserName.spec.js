import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserName from './getUserName.js'

describe('getUserName', () => {
    //Declaramos la conexión a la base de datos y borramos los usuarios
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    //Creamos un usuario
    /* it('succeeds on existing user', () =>
        User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
            .then(user => getUserName(user.id, user.id))
            .then(name => expect(name).to.equal('Voromir'))
    ) */
    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Boromir', email: 'boromir@middleearth.com', username: 'boromir', password: 'boromir123' })

        const name = await getUserName(user.id, user.id)

        expect(name).to.equal('Boromir')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserName('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ name: 'Bilblo', email: 'bilbo@middleearth.com', username: 'bilbo', password: 'bilbo' })
                .then(user => getUserName(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect())
})