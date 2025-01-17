import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import db, { User, Product } from "dat";
import { errors } from "com";
const { SystemError } = errors;
import getFavorites from "./getFavorites.js";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("getFavorites", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));
  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]));
  after(() => db.disconnect());

  it("succeeds on retrieving user favorites", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      favorites: ["507f1f77bcf86cd799439011"]
    });

    const product = await Product.create({
      _id: "507f1f77bcf86cd799439011",
      name: "Chontaduro",
      price: 12,
      description: "Fruta colombiana",
      author: user._id,
      images: ["melon3.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      likes: []
    });

    const favorites = await getFavorites({ id: user.id });

    expect(favorites).to.be.an('array');
    expect(favorites).to.have.lengthOf(1);
    expect(favorites[0]._id.toString()).to.equal(product._id.toString());
  });

  it("returns empty array when user has no favorites", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      favorites: []
    });

    const favorites = await getFavorites({ id: user.id });

    expect(favorites).to.be.an('array');
    expect(favorites).to.have.lengthOf(0);
  });

  it("fails when user does not exist", async () => {
    const nonExistentId = "507f1f77bcf86cd799439099";

    try {
      await getFavorites({ id: nonExistentId });
      throw new Error('should not reach this point');
    } catch (error) {
      expect(error.message).to.include('not found');
    }
  });
});