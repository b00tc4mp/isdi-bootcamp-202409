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
const { credentialsError } = errors

const name = 'Gandalf'
const username = 'greyGandalf'
const password = 'youshallnotpass'
const email = 'gandalf@themiddleearth.com'
const plan = 'free'
const creationStatus = 'true'


//Testinc escenarios
describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name, username, password: bcrypt.hashSync(password, 10), email, plan, creationStatus })

        const user = await authenticateUser(username, password)

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        //expect(user.role).be.an('array').that.includes.oneOf(['standard', 'provider'])
        //expect(user.role).to.have.lengthOf.at.least(1)
    })
})