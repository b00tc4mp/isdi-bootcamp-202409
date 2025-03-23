import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import bcrypt from "bcryptjs";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

import registerUser from "./registerUser.js";

describe("registerUser", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));
  beforeEach(() => User.deleteMany());
  after(() => db.disconnect());

  it("succeeds on new user", async () => {
    const data = {
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      location: "675ddab950659ce09993dc1e",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await registerUser(data);

    const user = await User.findOne({ email: data.email });
    expect(user).to.exist;
    expect(user.firstName).to.equal(data.firstName);
    expect(bcrypt.compareSync(data.password, user.password)).to.be.true;
  });

  it("fails on existing user", async () => {
    const data = {
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      location: "675ddab950659ce09993dc1e",
      password: "123123123",
      passwordRepeat: "123123123",
    };

    await User.create({ ...data, password: bcrypt.hashSync(data.password, 10) });
    await expect(registerUser(data)).to.be.rejectedWith(DuplicityError, "user already exists");
  });

  it("fails when bcrypt.hash throws SystemError", async () => {
    const originalHash = bcrypt.hash;
    bcrypt.hash = () => Promise.reject(new Error("Hashing error"));

    await expect(
      registerUser({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        location: "675ddab950659ce09993dc1e",
        password: "123123123",
        passwordRepeat: "123123123",
      })
    ).to.be.rejectedWith(SystemError, "Hashing error");

    bcrypt.hash = originalHash; // Restaura bcrypt.hash
  });

  it("fails when User.create throws SystemError", async () => {
    const originalCreate = User.create;
    User.create = () => Promise.reject(new Error("Database error"));

    await expect(
      registerUser({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        location: "675ddab950659ce09993dc1e",
        password: "123123123",
        passwordRepeat: "123123123",
      })
    ).to.be.rejectedWith(SystemError, "Database error");

    User.create = originalCreate; // Restaura User.create
  });

  it("fails when validation throws an error", async () => {
    await expect(
      registerUser({
        firstName: "", // Nombre inválido
        lastName: "cano",
        email: "invalid-email", // Email inválido
        location: "invalid", // Cambié 'ubicacion' por 'location' para que coincida con el resto
        password: "123", // Contraseña demasiado corta
        passwordRepeat: "123",
      })
    ).to.be.rejectedWith("invalid name length");
  });
});
