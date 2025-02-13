import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { errors } from "com";

const { NotFoundError, SystemError } = errors;

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Category, Subcategory } from "dat";
import getCategories from "./getCategories.js";

describe("getCategories", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));
  beforeEach(async () => {
    await Category.deleteMany();
    await Subcategory.deleteMany();
  });
  afterEach(async () => {
    await Category.deleteMany();
    await Subcategory.deleteMany();
  });
  after(() => db.disconnect());

  // 1. Caso exitoso: devuelve categorías correctamente
  it("succeeds returning categories", async () => {
    const category1 = new Category({ name: "Electronics" });
    const category2 = new Category({ name: "Books" });

    await category1.save();
    await category2.save();

    const categories = await getCategories();

    expect(categories).to.exist;
    expect(categories).to.have.lengthOf(2);
    expect(categories[0].name).to.equal("Electronics");
    expect(categories[1].name).to.equal("Books");
  });

  // 2. Caso: No hay categorías, lanza NotFoundError
  it("fails with NotFoundError when no categories found", async () => {
    // No guardamos ninguna categoría en la base de datos
    await expect(getCategories()).to.be.rejectedWith(
      NotFoundError,
      "categories not found"
    );
  });

  // 3. Caso: Error de base de datos, lanza SystemError
  it("fails with SystemError on database error", async () => {
    // Simulamos un error en la base de datos
    const originalFind = Category.find;
    Category.find = () => {
      throw new Error("Simulated DB error");
    };

    await expect(getCategories()).to.be.rejectedWith(
      SystemError,
      "Simulated DB error"
    );

    // Restauramos la función original
    Category.find = originalFind;
  });
});
