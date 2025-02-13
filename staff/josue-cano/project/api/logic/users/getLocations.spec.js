import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Location } from "dat";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

import getLocations from "./getLocations.js";

describe("getLocations", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => Location.deleteMany());

  it("succeeds and returns all locations from the database", async () => {
    // ubicaciones en la base de datos
    await Location.create([
      { ciudad: "Sant Cugat del Vallès", src: "cdmx.png" },
      { ciudad: "Terrassa", src: "terrassa.png" },
    ]);

    const locations = await getLocations();

    expect(locations).to.exist;
    expect(locations).to.be.an("array");
    expect(locations).to.have.lengthOf(2);

    locations.forEach((location) => {
      expect(location).to.have.property("ciudad").that.is.a("string");
      expect(location).to.have.property("src").that.is.a("string");
    });
  });

  it("fails when no locations are found", async () => {
    await Location.deleteMany();

    await expect(getLocations()).to.be.rejectedWith(NotFoundError, "Locations not found");
  });

  it("fails with SystemError on database error", async () => {
    const originalFind = Location.find;

    Location.find = () => {
      return Promise.reject(new Error("Database error")); // simulacion error
    };

    // el error sea capturado y envuelto en un SystemError
    await expect(getLocations()).to.be.rejectedWith(SystemError, "Database error");

    // Restaura el método original
    Location.find = originalFind;
  });

  after(() => db.disconnect());
});
