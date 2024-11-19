import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Post, Comment } from "dat";
import { errors } from "com";

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors;

import deletePost from "./deletePost.js";

debugger;

describe("deletePost", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

  it("succeeds for existing user", () => {
    const user = new User({
      name: "Coco Loco",
      email: "coco@loco.com",
      username: "cocoloco",
      password: "123123123",
    });
    const post = new Post({
      author: user.id,
      image: "https://www.image.com",
      text: "hello world",
    });

    return Promise.all([user.save(), post.save()]).then(([user, post]) =>
      deletePost(user.id, post.id)
        .then(() => Post.findById(post.id))
        .then((deletedPost) => {
          expect(deletedPost).to.be.null;
        })
    );
  });

  it("fails on non-existing user", () =>
    expect(
      deletePost("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^user not found$/));

  it("fails on non-existing post", () =>
    expect(
      User.create({
        name: "Coco Loco",
        email: "coco@loco.com",
        username: "cocoloco",
        password: "123123123",
      }).then((user) => deletePost(user.id, "012345678901234567890123"))
    ).to.be.rejectedWith(NotFoundError, /^post not found$/));

  it("fails on non-own post", () => {
    const user = new User({
      name: "Coco Loco",
      email: "coco@loco.com",
      username: "cocoloco",
      password: "123123123",
    });
    const user2 = new User({
      name: "Coco Loco2",
      email: "coco@loco2.com",
      username: "cocoloco2",
      password: "123123123",
    });
    const post = new Post({
      author: user2.id,
      image: "https://www.image.com",
      text: "hello world",
    });
    return expect(
      Promise.all([user.save(), user2.save(), post.save()]).then(
        ([user, user2, post]) => deletePost(user.id, post.id)
      )
    ).to.be.rejectedWith(OwnershipError, /^user is not author of post$/);
  });

  it("fails on non-string user-id", () =>
    expect(() => deletePost(true, "012345678901234567890123")).to.throw(
      ValidationError,
      /^invalid userId$/
    ));

  it("fails on non-existing user-id", () =>
    expect(
      deletePost("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^user not found$/));

  after(() => db.disconnect());
});
