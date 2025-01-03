import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { User, Producto } from "dat";

chai.use(chaiAsPromised);
const { expect } = chai;
import { errors } from "com";
const { SystemError } = errors;

describe("getFavorites", () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => User.deleteMany());
    after(() => db.disconnect());describe("getFavorites", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));
  beforeEach(() => User.deleteMany());
  after(() => db.disconnect());