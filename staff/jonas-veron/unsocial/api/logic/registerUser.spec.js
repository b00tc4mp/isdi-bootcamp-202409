import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";

const { DuplicityError } = errors;

import registerUser from "./registerUser.js";

describe("registerUser", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => User.deleteMany());

  it("succeeds on new user", () =>
    registerUser(
      "Robin Hood",
      "robin@hood.com",
      "robinhood",
      "123123123",
      "123123123"
    )
      .then(() => User.findOne({ username: "robinhood" }))
      .then((user) => {
        expect(user).to.exist;
        expect(user.name).to.equal("Robin Hood");
        expect(user.email).to.equal("robin@hood.com");
        expect(user.username).to.equal("robinhood");
        expect(user.password).to.equal("123123123");
      }));

  it("fails on existing user", () =>
    expect(
      User.create({
        name: "Robin Hood",
        email: "robin@hood.com",
        username: "robinhood",
        password: "123123123",
      }).then(() =>
        registerUser(
          "Robin  Hood",
          "robin@hood.com",
          "robinhood",
          "123123123",
          "123123123"
        )
      )
    ).to.be.rejectedWith(DuplicityError, "user already exists"));

  after(() => db.disconnect());
});
