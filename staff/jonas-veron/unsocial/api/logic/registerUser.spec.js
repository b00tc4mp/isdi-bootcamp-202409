import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import bcrypt from "bcryptjs";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";

const { DuplicityError } = errors;

import registerUser from "./registerUser.js";

describe("registerUser", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => User.deleteMany());

  it("succeeds on new user", async () => {
    await registerUser(
      "Robin Hood",
      "robin@hood.com",
      "robinhood",
      "123123123",
      "123123123"
    );

    const user = await User.findOne({ username: "robinhood" });

    expect(user).to.exist;
    expect(user.name).to.equal("Robin Hood");
    expect(user.email).to.equal("robin@hood.com");
    expect(user.username).to.equal("robinhood");
    expect(bcrypt.compareSync("123123123", user.password)).to.be.true;
  });

  it("fails on existing user", () =>
    expect(
      (async () => {
        await User.create({
          name: "Robin Hood",
          email: "robin@hood.com",
          username: "robinhood",
          password: bcrypt.hashSync("123123123", 10),
        });
        await registerUser(
          "Robin  Hood",
          "robin@hood.com",
          "robinhood",
          "123123123",
          "123123123"
        );
      })()
    ).to.be.rejectedWith(DuplicityError, "user already exists"));

  after(() => db.disconnect());
});