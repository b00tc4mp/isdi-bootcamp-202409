import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { errors } from "com";

const { NotFoundError } = errors;

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product } from "dat";
import getProducts from "./getProducts.js";

describe("getProducts", () => {
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

  it("succeeds on matching keyword", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test@test.com",
      password: "123123123",
      favorites: [],
    });
    await Product.create({
      name: "Chontaduro",
      author: user._id,
      price: 12,
      description: "Fruta colombiana",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["melon3.jpg"],
      likes: [],
    });
    const result = await getProducts({ userId: user._id, keyword: "Chontaduro" });
    expect(result).to.have.lengthOf(1);
  });

  it("succeeds on no matches", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test@test.com",
      password: "123123123",
      favorites: [],
    });

    await Product.create({
      name: "Chontaduro",
      author: user._id,
      price: 12,
      description: "Fruta colombiana",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["melon3.jpg"],
      likes: [],
    });

    const result = await getProducts({ userId: user._id, keyword: "Manzana" });
    expect(result).to.have.lengthOf(0);
  });

  it("succeeds returning products without user", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test@test.com",
      password: "123123123",
      favorites: [],
    });

    await Product.create({
      name: "Chontaduro",
      author: user._id,
      price: 12,
      description: "Fruta colombiana",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["melon3.jpg"],
      likes: [],
    });

    const result = await getProducts({ keyword: "Chontaduro" });

    expect(result).to.have.lengthOf(1);
    expect(result[0].name).to.equal("Chontaduro");
  });

  it("succeeds returning products with favorite flag", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test@test.com",
      password: "123123123",
      favorites: [],
    });

    const product = await Product.create({
      name: "Chontaduro",
      author: user._id,
      price: 12,
      description: "Fruta colombiana",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["melon3.jpg"],
      likes: [],
    });

    await User.findByIdAndUpdate(user._id, {
      favorites: [product._id],
    });

    const result = await getProducts({ userId: user._id, keyword: "Chontaduro" });

    expect(result).to.have.lengthOf(1);
    expect(result[0].isFavorite).to.be.true;
    expect(result[0].name).to.equal("Chontaduro");
  });

  it("fails on database error", async () => {
    const originalFind = Product.find;
    Product.find = () => Promise.reject(new Error("Database error"));

    await expect(getProducts({ keyword: "test" })).to.be.rejectedWith(NotFoundError);

    Product.find = originalFind;
  });
});
