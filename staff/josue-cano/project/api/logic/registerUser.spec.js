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
  // before(async () => await db.connect(process.env.MONGO_URL_TEST))
  before(() => db.connect(process.env.MONGO_URL_TEST));

  // before(async() => await User.deleteMany())
  beforeEach(() => User.deleteMany());

  it("succeeds on new user", async () => {
    await registerUser({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      ubicacion: "675ddab950659ce09993dc1e",
      password: "123123123",
      passwordRepeat: "123123123",
    });

    const user = await User.findOne({ email: "josuecano@delgado.com" });

    expect(user).to.exist; //.not.to.be.null
    expect(user.firstName).to.equal("josue");
    expect(user.lastName).to.equal("cano");
    expect(user.email).to.equal("josuecano@delgado.com");
    expect(user.ubicacion.toString()).to.equal("675ddab950659ce09993dc1e");
    expect(bcrypt.compareSync("123123123", user.password)).to.be.true;
  });

  it("fails on existing user", () =>
    expect(
      (async () => {
        await User.create({
          firstName: "josue",
          lastName: "cano",
          email: "josuecano@delgado.com",
          ubicacion: "675ddab950659ce09993dc1e",
          password: bcrypt.hashSync("123123123", 10),
        });

        await registerUser({
          firstName: "josue",
          lastName: "cano",
          email: "josuecano@delgado.com",
          ubicacion: "675ddab950659ce09993dc1e",
          password: "123123123",
          passwordRepeat: "123123123",
        });
      })()
    ).to.be.rejectedWith(DuplicityError, "user already exists"));

  //after(async() => await db.diconnect())
  after(() => db.disconnect());
});
