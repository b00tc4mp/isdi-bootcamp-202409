import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import { errors } from "com";
const { NotFoundError } = errors;

import db, { User, Product } from "dat";
import deleteProduct from "./deleteProduct.js";

describe("deleteProduct", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
    await Product.deleteMany();
  });

  afterEach(async () => {
    await User.deleteMany();
    await Product.deleteMany();
  });

  after(() => db.disconnect());

  it("removes the specified product", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test2@test.com",
      password: "123123123",
    });

    const createdProduct = await Product.create({
      name: "TestProduct",
      author: user._id,
      price: 100,
      description: "Sample Description",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["testproduct.jpg"],
      likes: [],
    });

    const result = await deleteProduct({
      productId: createdProduct._id.toString(),
      userId: user._id.toString(),
    });

    expect(result.deletedCount).to.equal(1);
  });

  it("can not remove the specified product", async () => {
    const fakeProductId = "0123456789abcdef01234567";
    const fakeUserId = "abcdef0123456789abcdef01";

    await expect(deleteProduct({ productId: fakeProductId, userId: fakeUserId })).to.be.rejectedWith(
      NotFoundError,
      "No puedes borrar este producto"
    );
  });
});
