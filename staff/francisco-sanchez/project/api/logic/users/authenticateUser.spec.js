// Import block
import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import db, { User } from 'dat'
import { errors } from 'com'


//Logical tested
import authenticateUser from './authenticateUser.js'


//Inicialitzation testing
chai.use(chaiAsPromised)
const { expect } = chai
const { CredentialsError } = errors

const name = 'Gandalf'
const username = 'greyGandalf'
const password = 'youshallnotpass'
const email = 'gandalf@themiddleearth.com'
const plan = 'free'
const creationStatus = 'true'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name, username, password: bcrypt.hashSync(password, 10), email, plan, creationStatus })

        const user = await authenticateUser(username, password)

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('standard')
    })

    it('fails on non-existing user ', () =>
        expect(authenticateUser('greyGandalf', '12312youshallnotpass3123')
        ).to.be.rejectedWith(CredentialsError, 'user not found')
    )

    after(() => db.disconnect())
})