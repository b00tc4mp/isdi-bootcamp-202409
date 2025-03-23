import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";
import getUserDetail from "./getUserDetails.js";

const { ValidationError, SystemError } = errors;

describe("getUserDetail", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
  });

  after(() => db.disconnect());

  //  Falla si userId no es
  it("fails on invalid userId", async () => {
    await expect(getUserDetail("1234")).to.be.rejectedWith(ValidationError, "invalid userId length");
  });

  // Retorna null si no existe user
  it("returns null if user does not exist", async () => {
    const fakeId = "0123456789abcdef01234567";
    const user = await getUserDetail(fakeId);
    expect(user).to.be.null;
  });

  // Retorna user si existe
  it("succeeds returning the user if it exists", async () => {
    const createdUser = await User.create({
      firstName: "pedro",
      lastName: "asaswas",
      email: "carlos@gmail.com",
      password: "hashedpassword",
      favorites: [],
    });

    const user = await getUserDetail(createdUser._id.toString());

    expect(user).to.exist;
    expect(user._id.toString()).to.equal(createdUser._id.toString());
    expect(user.email).to.equal("carlos@gmail.com");
  });

  //  SystemError si hay error de BD

  it("invokes SystemError on database error (if SystemError actually throws)", async () => {
    const originalFindOne = User.findOne;
    User.findOne = () => Promise.reject(new Error("Simulated DB error"));

    await expect(getUserDetail("0123456789abcdef01234567")).to.be.rejectedWith(SystemError, "Simulated DB error");

    User.findOne = originalFindOne;
  });
});
