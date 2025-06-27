import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { FaunaFlora, User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors;

import getFaunaFloraByCity from './getFaunaFloraByCity.js'


describe('getFaunaFloraByCity', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(() =>
        Promise.all([User.deleteMany(), FaunaFlora.deleteMany()])
    )

    it("succeeds when searching for an existing city", async () => {
        // Insert test data
        const user = await User.create({ name: 'Frank', email: 'frank@gmail.com', password: '123123123', role: 'diver' })

        const faunaFlora = await FaunaFlora.create({
            city: "barcelona",
            fauna: ["Mediterranean Monk Seal", "Loggerhead Sea Turtle", "Common Octopus"],
            flora: ["Posidonia Oceanica", "Coralline Algae", "Seaweed"],
            description: "Barcelona’s coastal waters and nearby marine ecosystems offer a fascinating glimpse into Mediterranean biodiversity."
        });


        const infoFaunaFlora = await getFaunaFloraByCity(user.id, faunaFlora.city)

        expect(infoFaunaFlora).to.exist;
        expect(infoFaunaFlora.city).to.equal("barcelona");
        expect(infoFaunaFlora.fauna).to.be.an("array").that.includes("Common Octopus");
        expect(infoFaunaFlora.flora).to.be.an("array").that.includes("Posidonia Oceanica");
    });

    it("fails when searching for a city that does not exist", async() => {
        const user = await User.create({ name: 'Frank', email: 'frank@gmail.com', password: '123123123', role: 'diver' })

        return expect(
            getFaunaFloraByCity(user.id, "Madrid")).to.be.rejectedWith(NotFoundError, "No fauna and flora data found for Madrid")
    }
    )

    it('fails on non-exisitng user', async () => {
        await expect(getFaunaFloraByCity('67a0a8733ef526ddff674b25', 'Barcelona')).to.be.rejectedWith(NotFoundError, "user not found");
    });

    after(() => db.disconnect());
})