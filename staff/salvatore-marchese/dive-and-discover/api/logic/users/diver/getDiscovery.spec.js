import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Discovery } from "dat";
import { errors } from "com";

const { NotFoundError, ValidationError, SystemError } = errors;

import getDiscovery from "./getDiscovery.js";

describe("getDiscovery", () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(() => Discovery.deleteMany());

    it("succeeds on finding discovery data for a valid city", async () => {
        await Discovery.create({ city: "barcelona", info: "Some discovery data" });

        const result = getDiscovery("Barcelona");

        expect(result).to.exist;
        expect(result.city).to.equal("barcelona");
        expect(result.info).to.equal("Some discovery data");
    });

    it("normalizes city input (trims and converts to lowercase)", async () => {
        await Discovery.create({ city: "new york", info: "Some discovery data" });

        const result = getDiscovery("  New York  ");

        expect(result).to.exist;
        expect(result.city).to.equal("new york");
        expect(result.info).to.equal("Some discovery data");
    });

    it("fails when city does not exist", () => 
        expect(getDiscovery("Unknown City")).to.be.rejectedWith(
            NotFoundError, "No discovery data found for Unknown City"
        )
    );

    it("fails when city input is empty", () => 
        expect(getDiscovery("")).to.be.rejectedWith(
            ValidationError, "Invalid city name"
        )
    );

    it("fails when city input is not a string", () => 
        expect(getDiscovery(123)).to.be.rejectedWith(
            ValidationError, "Invalid city name"
        )
    );

    after(() => db.disconnect());
});