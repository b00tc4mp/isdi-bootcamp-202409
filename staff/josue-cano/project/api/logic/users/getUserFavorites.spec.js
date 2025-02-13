import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product } from "dat";
import { errors } from "com";
import getUserFavorites from "./getUserFavorites.js";

const { ValidationError, SystemError, NotFoundError } = errors;

describe("getUserFavorites", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
    await Product.deleteMany();
  });

  after(() => db.disconnect());

  it("fails on invalid id format", async () => {
    await expect(getUserFavorites({ id: "1234" })).to.be.rejectedWith(ValidationError, "invalid id length");
  });

  it("fails if user does not exist", async () => {
    const fakeId = "0123456789abcdef01234567";

    await expect(getUserFavorites({ id: fakeId })).to.be.rejectedWith(
      NotFoundError,
      "No se encontró un usuario con el ID proporcionado."
    );
  });

  it("returns an empty array if user has no favorites", async () => {
    const user = await User.create({
      firstName: "Josue",
      lastName: "Cano",
      email: "josue@example.com",
      password: "hashedpassword",
      favorites: [],
    });

    const favorites = await getUserFavorites({ id: user._id.toString() });

    expect(favorites).to.be.an("array").that.is.empty;
  });

  it("returns user favorites with isFavorite=true", async () => {
    const categoryId = "645c34a750659ce09993db9c";
    const subcategoryId = "645c34a750659ce09993db9d";

    const product1 = await Product.create({
      name: "Manzanas",
      price: 10,
      description: "Manzanas rojas",
      category: categoryId,
      subcategory: subcategoryId,
      author: "0123456789abcdef01234567",
    });

    const product2 = await Product.create({
      name: "Peras",
      price: 15,
      description: "Peras verdes",
      category: categoryId,
      subcategory: subcategoryId,
      author: "0123456789abcdef01234567",
    });

    const user = await User.create({
      firstName: "Josue",
      lastName: "Cano",
      email: "josue@example.com",
      password: "hashedpassword",
      favorites: [product1._id, product2._id],
    });

    const favorites = await getUserFavorites({ id: user._id.toString() });

    expect(favorites).to.be.an("array").that.has.lengthOf(2);

    const favoriteIds = favorites.map((fav) => fav._id.toString());
    expect(favoriteIds).to.include.members([product1._id.toString(), product2._id.toString()]);

    favorites.forEach((favorite) => {
      expect(favorite.isFavorite).to.be.true;
    });
  });

  it("fails with SystemError on database error", async () => {
    const originalFindOne = User.findOne;
    User.findOne = () => Promise.reject(new Error("Simulated DB error"));

    const fakeId = "0123456789abcdef01234567";

    await expect(getUserFavorites({ id: fakeId })).to.be.rejectedWith(SystemError, "Simulated DB error");

    User.findOne = originalFindOne;
  });
});
