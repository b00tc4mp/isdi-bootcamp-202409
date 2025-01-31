import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { FaunaFlora } from "dat";
import { errors } from "com";
import getFaunaFloraByCity from "./getFaunaFloraByCity.js";

const { NotFoundError, ValidationError } = errors;

describe("getFaunaFloraByCity", () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(async () => {
        // Ensure database is clean before each test
        await FaunaFlora.deleteMany();

        // Insert test data
        await FaunaFlora.create({
            city: "barcelona",
            fauna: ["Mediterranean Monk Seal", "Loggerhead Sea Turtle", "Common Octopus"],
            flora: ["Posidonia Oceanica", "Coralline Algae", "Seaweed"],
            description: "Barcelona’s coastal waters and nearby marine ecosystems offer a fascinating glimpse into Mediterranean biodiversity."
        });
    });

    it("succeeds when searching for an existing city", async () => {
        const result = await getFaunaFloraByCity("Barcelona");

        expect(result).to.exist;
        expect(result.city).to.equal("barcelona");
        expect(result.fauna).to.be.an("array").that.includes("Common Octopus");
        expect(result.flora).to.be.an("array").that.includes("Posidonia Oceanica");
    });

    it("succeeds with a city name that contains extra spaces", async () => {
        const result = await getFaunaFloraByCity("  barcelona  ");

        expect(result).to.exist;
        expect(result.city).to.equal("barcelona");
    });

    it("fails when searching for a city that does not exist", async () => {
        await expect(getFaunaFloraByCity("Unknown City")).to.be.rejectedWith(NotFoundError, "No fauna and flora data found for Unknown City");
    });

    it("fails when city input is an empty string", async () => {
        await expect(getFaunaFloraByCity("")).to.be.rejectedWith(ValidationError, "City is required and must be a non-empty string.");
    });

    it("fails when city input is not a string", async () => {
        await expect(getFaunaFloraByCity(123)).to.be.rejectedWith(ValidationError, "City is required and must be a non-empty string.");
    });

    after(() => db.disconnect());
});