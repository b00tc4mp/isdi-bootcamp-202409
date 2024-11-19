import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Post } from "dat";
import { errors } from "com";

const { NotFoundError, SystemError } = errors;

import createPost from "./createPost.js";

describe("createPost", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

  it("succeeds for existing user", () =>
    User.create({
      name: "Robin Hood",
      email: "robin@hood.com",
      username: "robinhood",
      password: "123123123",
    }).then((user) =>
      createPost(
        user.id,
        "https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg",
        "PRUEBA!!!!!!!"
      )
        .then(() => Post.findOne({ author: user.id }))
        .then((post) => {
          expect(post).to.exist;
          expect(post.author.toString()).to.equal(user.id.toString());
          expect(post.author.toString()).to.have.lengthOf(24);
          expect(post.image).to.equal(
            "https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg"
          );
          expect(post.text).to.equal("PRUEBA!!!!!!!");
          expect(post.text).to.be.a.string;
        })
    ));

  it("fails on the user does not exist", () =>
    expect(
      createPost(
        "012345678901234567890123",
        "https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg",
        "PRUEBA!!!!!!!"
      )
    ).to.be.rejectedWith(NotFoundError, "user not found"));

  it("fails a system"),
    () =>
      expect(
        createPost(
          invalid - id,
          "https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg",
          "PRUEBA!!!!!!!"
        )
      ).to.be.rejectedWith(SystemError(error.message));

  after(() => db.disconnect());
});
