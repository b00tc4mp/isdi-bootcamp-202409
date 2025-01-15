import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import bcrypt from "bcryptjs";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";

const { CredentialsError } = errors;

import authenticateUser from "./authenticateUser.js";

describe("authenticateUser", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => User.deleteMany());

  it("succeeds on existing user", () =>
    User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: bcrypt.hashSync("123123123", 10),
    })
      .then(() => authenticateUser({ email: "josuecano@delgado.com", password: "123123123" }))
      .then((token) => {
        expect(token).to.exist;
        expect(token).to.be.a.string;
      }));

  it("fails on non-existing user", () =>
    expect(authenticateUser({ email: "josuecano@de565lgado.com", password: "123123123" })).to.be.rejectedWith(
      CredentialsError,
      "user does not exist"
    ));

  it("fails on wrong credentials", () =>
    expect(authenticateUser({ email: "josuecano@de565lgado.com", password: "123123123123" })).to.be.rejectedWith(
      CredentialsError,
      "wrong credentials"
    ));

  after(() => db.disconnect());
});
