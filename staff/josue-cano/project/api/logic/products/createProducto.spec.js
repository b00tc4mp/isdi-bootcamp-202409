import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import bcrypt from "bcryptjs";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product  } from "dat";
import { errors } from "com";

const { DuplicityError, SystemError } = errors;

import registerUser from "../users/registerUser.js";

describe("createProduct", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));
  beforeEach(() => User.deleteMany());
  after(() => User.deleteMany());
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

})