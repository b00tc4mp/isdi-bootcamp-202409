import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product } from "dat";
import { errors } from "com";
import getUserProduct from "./getUserProducts.js";

const { ValidationError } = errors;

describe("getUserProduct", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
    await Product.deleteMany();
  });

  after(() => db.disconnect());

  // Falla si userId no es un string de 24 chars
  it("fails if userId is invalid (not 24 hex chars)", async () => {
    await expect(getUserProduct("1234")).to.be.rejectedWith(ValidationError, "invalid userId length");
  });

  // Retorna array vacío si el user NO tiene productos
  it("returns empty array when user has no products", async () => {
    const user = await User.create({
      firstName: "NoProduct",
      lastName: "User",
      email: "noproduct@test.com",
      password: "hashedpassword",
    });

    const products = await getUserProduct(user._id.toString());
    expect(products).to.be.an("array");
    expect(products).to.have.lengthOf(0);
  });

  //
  // Retorna los productos del user cuando sí existen
  it("returns user products when they exist", async () => {
    const user = await User.create({
      firstName: "WithProduct",
      lastName: "User",
      email: "withproduct@test.com",
      password: "hashedpassword",
    });

    const product1 = await Product.create({
      name: "Fresas",
      price: 25,
      description: "fresascaaaas",
      author: user._id,
      images: ["fresas.jpeg", "fresas3.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
    });

    const product2 = await Product.create({
      name: "Melocotones",
      price: 10,
      description: "Melocotones jugosos",
      author: user._id,
      images: ["melocoton.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
    });

    const products = await getUserProduct(user._id.toString());

    expect(products).to.be.an("array").that.has.lengthOf(2);

    // Verificamos que contenga esos productos
    const productIds = products.map((p) => p._id.toString());
    expect(productIds).to.include.members([product1._id.toString(), product2._id.toString()]);
  });
});
