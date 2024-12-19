// Import block
import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db, { BasePack, User } from 'dat';
import { errors } from 'com';

// Logical tested
import getBasePacks from './getBasePacks.js';

// Initialization testing
chai.use(chaiAsPromised);
const { expect } = chai;
const { SystemError, NotFoundError } = errors;

// Dummy data for testing
const userId = '674f1fc3a728c03cdd10ba3c'; // Valid ObjectId string for testing
const packData = [
    {
        user: userId,
        packName: '5h pack',
        description: 'Test pack 5 hours',
        quantity: 5,
        unit: 'hours',
        expiringTime: 12,
        price: 235,
        currency: 'EUR',
    },
    {
        user: userId,
        packName: '10h pack',
        description: 'Test pack 10 hours',
        quantity: 10,
        unit: 'hours',
        expiringTime: 6,
        price: 450,
        currency: 'EUR',
    },
];

// Testing scenarios
describe('getBasePacks', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST)); // Connect to the test database
    beforeEach(async () => {
        await BasePack.deleteMany(); // Clear the BasePack collection
        await User.deleteMany(); // Clear the User collection
        await BasePack.insertMany(packData); // Insert dummy pack data
        await User.create({
            _id: userId,
            username: 'testUser',
            password: 'password123',
            email: 'test@domain.com',
            plan: 'free',
            creationStatus: 'true',
        }); // Create a dummy user
    });

    it('succeeds on retrieving packs for an existing user', async () => {
        const packs = await getBasePacks(userId);

        expect(packs).to.exist;
        expect(packs).to.be.an('array').that.has.lengthOf(2);

        // Check the structure of the first pack
        const [firstPack] = packs;
        expect(firstPack).to.have.property('id');
        expect(firstPack.id).to.be.a('string');
        expect(firstPack.id).to.have.lengthOf(24);

        expect(firstPack).to.have.property('packName', '5h pack');
        expect(firstPack).to.have.property('description', 'Test pack 5 hours');
        expect(firstPack).to.have.property('quantity', 5);
        expect(firstPack).to.have.property('unit', 'hours');
        expect(firstPack).to.have.property('expiringTime', 12);
        expect(firstPack).to.have.property('price', 235);
        expect(firstPack).to.have.property('currency', 'EUR');
    });

    it('fails if the user has no packs', async () => {
        await BasePack.deleteMany(); // Remove all packs

        await expect(getBasePacks(userId)).to.be.rejectedWith(NotFoundError, 'No basePack found for this userId');
    });

    it('fails if the user does not exist', async () => {
        const nonExistentUserId = '674f1fc3a728c03cdd10ba4d'; // Different ObjectId

        await expect(getBasePacks(nonExistentUserId)).to.be.rejectedWith(NotFoundError, 'No basePack found for this userId');
    });

    it('fails on system error (e.g., database connection issue)', async () => {
        await db.disconnect(); // Simulate a database disconnection

        await expect(getBasePacks(userId)).to.be.rejectedWith(SystemError);

        // Reconnect for other tests
        await db.connect(process.env.MONGO_URL_TEST);
    });
});