import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";
import searchDiveCenters from "./searchDiveCenters.js";

const { NotFoundError, ValidationError } = errors;

describe("searchDiveCenters", () => {
    let diver, diveCenter1, diveCenter2;

    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(async () => {
        // Ensure database is clean before each test
        await User.deleteMany();

        // Create a diver user
        diver = await User.create({
            name: "Test Diver",
            email: "diver@test.com",
            password: "securepassword",
            role: "diver"
        });

        // Create two dive centers in the same city
        diveCenter1 = await User.create({
            name: "Dive Center 1",
            email: "center1@test.com",
            password: "securepassword",
            role: "center",
            city: "Barcelona"
        });

        diveCenter2 = await User.create({
            name: "Dive Center 2",
            email: "center2@test.com",
            password: "securepassword",
            role: "center",
            city: "Barcelona"
        });
    });

    it("succeeds when searching for existing dive centers", async () => {
        const result = await searchDiveCenters(diver._id.toString(), "Barcelona");

        expect(result).to.be.an("array").with.lengthOf(2);
        expect(result[0]).to.have.property("name", "Dive Center 1");
        expect(result[1]).to.have.property("name", "Dive Center 2");
    });

    it("fails when searching for a city with no dive centers", async () => {
        await expect(searchDiveCenters(diver._id.toString(), "Madrid")).to.be.rejectedWith(NotFoundError, "No dive centers found in Madrid");
    });

    it("fails when user does not exist", async () => {
        await expect(searchDiveCenters("67a0a8733ef526ddff674b2a", "Barcelona")).to.be.rejectedWith(NotFoundError, "user not found");
    });


    after(() => db.disconnect());
});