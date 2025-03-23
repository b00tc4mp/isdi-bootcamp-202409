import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { errors } from "com";

chai.use(chaiAsPromised);
const { expect } = chai;

const { NotFoundError } = errors;

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

  //hay coincidencia con la keyword
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

    // Pasamos user._id como string
    const result = await getProducts({ userId: user._id.toString(), keyword: "Chontaduro" });
    expect(result).to.have.lengthOf(1);
  });

  //  no hay coincidencia con la keyword
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

    // userId como string, pero keyword "Manzana" no coincide
    const result = await getProducts({ userId: user._id.toString(), keyword: "Manzana" });
    expect(result).to.have.lengthOf(0);
  });

  //  Caso: se recuperan productos sin pasar userId
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

    // No pasamos userId => la validación de userId ni se ejecuta
    const result = await getProducts({ keyword: "Chontaduro" });

    expect(result).to.have.lengthOf(1);
    expect(result[0].name).to.equal("Chontaduro");
  });

  //  Caso: se recuperan productos + flag "isFavorite"
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

    // Añadimos el producto a favoritos de user
    await User.findByIdAndUpdate(user._id, {
      favorites: [product._id],
    });

    // Pasamos user._id como string
    const result = await getProducts({ userId: user._id.toString(), keyword: "Chontaduro" });

    expect(result).to.have.lengthOf(1);
    expect(result[0].isFavorite).to.be.true;
    expect(result[0].name).to.equal("Chontaduro");
  });

  //  Caso: simulamos error de base de datos
  it("fails on database error", async () => {
    const originalFind = Product.find;

    // Forzamos que Product.find lance un error
    Product.find = () => Promise.reject(new Error("Database error"));

    await expect(getProducts({ keyword: "test" })).to.be.rejectedWith(NotFoundError);

    // Restauramos la función original
    Product.find = originalFind;
  });
});
