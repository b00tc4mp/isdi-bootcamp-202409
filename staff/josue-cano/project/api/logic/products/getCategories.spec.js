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

  // it("fails when no categories are found", async () => {
  //   await expect(getCategories()).to.be.rejectedWith(NotFoundError, "categories not found");
  //   // const categories = await getCategories();
  //   // expect(categories).to.be.an("array");
  //   // expect(categories).to.have.lengthOf(0);
  // });

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

});
