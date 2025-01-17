import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Location } from "dat";
import { errors } from "com";
import getProductDetails from "./getProductDetails.js";

const { ValidationError } = errors;

describe("getProductDetails", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    // Limpiamos colecciones antes de cada test
    await User.deleteMany();
    await Product.deleteMany();
    await Location.deleteMany();
  });

  after(() => db.disconnect());
  //Verifica que lance ValidationError si el id no tiene 24 caracteres
  it("fails on invalid product id format", async () => {
    await expect(getProductDetails("1234")).to.be.rejectedWith(ValidationError, "invalid id length");
  });

  //producto con isFavorite=false cuando NO pasamos userId
  it("returns product with isFavorite = false when userId is not provided", async () => {
    // Creamos location con src y ciudad (ambos requeridos por tu esquema)
    const location = await Location.create({
      name: "Test Location",
      src: "some-src",
      ciudad: "some-city",
    });

    // Creamos un autor con location
    const author = await User.create({
      firstName: "Author",
      lastName: "Test",
      email: "author@test.com",
      password: "123123123",
      location: location._id,
    });

    // Creamos un product con category y subcategory requeridos
    const product = await Product.create({
      name: "Sample Product",
      author: author._id,
      price: 100,
      description: "Sample description",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
    });

    const result = await getProductDetails(product._id.toString());

    expect(result).to.be.an("object");
    expect(result._id.toString()).to.equal(product._id.toString());
    expect(result.isFavorite).to.be.false;

    expect(result.author).to.be.an("object");
    expect(result.author._id.toString()).to.equal(author._id.toString());

    expect(result.author.location).to.be.an("object");
    expect(result.author.location._id.toString()).to.equal(location._id.toString());
  });

  it("returns product with isFavorite = false when user does not have it in favorites", async () => {
    const user = await User.create({
      firstName: "UserNoFav",
      lastName: "Test",
      email: "nofav@test.com",
      password: "123123123",
      favorites: [],
    });

    const product = await Product.create({
      name: "Another Product",
      author: user._id, // da igual
      price: 50,
      description: "Product with no favorites",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
    });

    const result = await getProductDetails(product._id.toString(), user._id.toString());

    expect(result).to.be.an("object");
    expect(result._id.toString()).to.equal(product._id.toString());
    expect(result.isFavorite).to.be.false;
  });

  it("returns product with isFavorite = true when user has it in favorites", async () => {
    const user = await User.create({
      firstName: "UserFav",
      lastName: "Test",
      email: "fav@test.com",
      password: "123123123",
      favorites: [],
    });

    const product = await Product.create({
      name: "Fav Product",
      author: user._id,
      price: 999,
      description: "User will favorite this one",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
    });

    user.favorites.push(product._id);
    await user.save();

    const result = await getProductDetails(product._id.toString(), user._id.toString());
    expect(result).to.be.an("object");
    expect(result._id.toString()).to.equal(product._id.toString());
    expect(result.isFavorite).to.be.true;
  });
});
