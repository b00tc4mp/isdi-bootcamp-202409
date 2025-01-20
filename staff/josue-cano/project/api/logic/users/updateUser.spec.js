import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import bcrypt from "bcryptjs";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";
import updateUser from "./updateUser.js";

const { DuplicityError, SystemError } = errors;

describe("updateUser (actually creates user)", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
  });

  after(() => db.disconnect());

  it("succeeds on new user", async () => {
    const data = {
      firstName: "Josue",
      lastName: "Cano",
      email: "test2@example.com",
      location: "675c34a750659ce09993db93",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    const result = await updateUser(data);

    expect(result).to.be.an("object");
    expect(result._id).to.exist;
    expect(result.email).to.equal("test2@example.com");
    expect(result.password).to.be.null;

    const userInDb = await User.findOne({ email: "test2@example.com" });
    expect(userInDb).to.exist;
    expect(userInDb.location.toString()).to.equal("675c34a750659ce09993db93");
  });

  it("fails on existing user (duplicity)", async () => {
    await User.create({
      firstName: "Existing",
      lastName: "User",
      email: "duplicate@example.com",
      location: "675c34a750659ce09993db93",
      password: "longEnoughPass",
    });

    const data = {
      firstName: "Another",
      lastName: "User",
      email: "duplicate@example.com",
      location: "675c34a750659ce09993db93",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await expect(updateUser(data)).to.be.rejectedWith(DuplicityError, "user already exists");
  });

  it("fails when bcrypt.hash throws SystemError", async () => {
    //  error de bcrypt.hash
    const originalHash = bcrypt.hash;
    bcrypt.hash = () => Promise.reject(new Error("Hash error"));

    const data = {
      firstName: "HashErr",
      lastName: "User",
      email: "hasherror@example.com",
      location: "675c34a750659ce09993db93",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await expect(updateUser(data)).to.be.rejectedWith(SystemError, "Hash error");

    // Restauramos bcrypt.hash
    bcrypt.hash = originalHash;
  });

  it("fails when User.create throws SystemError", async () => {
    const originalCreate = User.create;
    User.create = () => Promise.reject(new Error("DB error"));

    const data = {
      firstName: "DbErr",
      lastName: "User",
      email: "dberror@example.com",
      location: "675c34a750659ce09993db93",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await expect(updateUser(data)).to.be.rejectedWith(SystemError, "DB error");

    User.create = originalCreate;
  });

  it("fails on validation error (password mismatch)", async () => {
    const data = {
      firstName: "Mismatch",
      lastName: "User",
      email: "mismatch@example.com",
      location: "675c34a750659ce09993db93",
      password: "123123123",
      passwordRepeat: "999999999",
    };

    await expect(updateUser(data)).to.be.rejectedWith("passwords do not match");
  });

  it("fails on missing location", async () => {
    const data = {
      firstName: "NoLoc",
      lastName: "User",
      email: "noloc@example.com",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await expect(updateUser(data)).to.be.rejectedWith("invalid location");
  });
});
