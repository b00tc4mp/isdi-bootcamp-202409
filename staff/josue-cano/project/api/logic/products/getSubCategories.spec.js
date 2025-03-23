import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Subcategory } from "dat";
import { errors } from "com";
import getSubcategories from "./getSubcategories.js";

const { NotFoundError, SystemError } = errors;

describe("getSubcategories", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    // Limpiamos la colección Subcategory antes de cada test
    await Subcategory.deleteMany();
  });

  afterEach(async () => {
    await Subcategory.deleteMany();
  });

  after(() => db.disconnect());

  // subcategorías en la BD y se devuelven

  it("succeeds returning subcategories", async () => {
    const sub1 = await Subcategory.create({
      nombre: "aguacates",
      category: "67531e4948f77b079b0d8191",
    });

    const sub2 = await Subcategory.create({
      nombre: "papayas",
      category: "67531e4948f77b079b0d8191",
    });

    const result = await getSubcategories();

    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(2);

    // chequea que incluya esos nombres
    const nombres = result.map((s) => s.nombre);
    expect(nombres).to.include.members(["aguacates", "papayas"]);
  });

  // Caso: no hay subcategorías => se espera NotFoundError

  it("fails with NotFoundError when no subcategories found", async () => {
    await expect(getSubcategories()).to.be.rejectedWith(NotFoundError, "categories not found");
  });

  // simulamos un error en la base de datos => SystemError
  it("fails with SystemError on database error", async () => {
    const originalFind = Subcategory.find;

    // se sobrecrisbe que tenga un método .lean() que devuelva una promesa rechazada
    Subcategory.find = () => {
      return {
        lean() {
          return Promise.reject(new Error("Simulated DB error"));
        },
      };
    };

    await expect(getSubcategories()).to.be.rejectedWith(SystemError, "Simulated DB error");

    // Restauramos la función original
    Subcategory.find = originalFind;
  });
});
