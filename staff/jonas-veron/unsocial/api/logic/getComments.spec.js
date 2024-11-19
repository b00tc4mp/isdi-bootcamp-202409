import "dotenv/config";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Post, Comment } from "dat";
import { errors } from "com";

const { NotFoundError, ValidationError, SystemError } = errors;

import getComments from "./getComments.js";

debugger;

describe("getComments", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

  it("succeeds for existing user", () => {
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
    const comment = new Comment({ author: user.id, text: "hello comment" });
    const comment2 = new Comment({ author: user2.id, text: "hello comment" });
    const comment3 = new Comment({ author: user.id, text: "hello comment" });
    const comment4 = new Comment({ author: user2.id, text: "hello comment" });
    const post = new Post({
      author: user.id,
      image: "https://www.image.com",
      text: "hola mundo",
      comments: [comment, comment2, comment3, comment4],
    });

    Promise.all([user.save(), post.save()]).then(([user, post]) =>
      getComments(user.id, post.id)
        .then(() => Post.findById(post.id))
        .then((post) => {
          expect(post).to.exist;
          expect(post.comments[0].author.id).to.equal(user.id);
          expect(post.comments[0].text).to.equal(comment.text);
          expect(post.comments[0].date).to.equal(comment.date);
          expect(post.comments).to.have.lengthOf(4);
        })
    );
  });

  it("fails on non-existing user", () =>
    expect(
      getComments("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^user not found$/));

  it("fails on non-existing post", () =>
    expect(
      User.create({
        name: "Coco Loco",
        email: "coco@loco.com",
        username: "cocoloco",
        password: "123123123",
      }).then((user) => getComments(user.id, "012345678901234567890123"))
    ).to.be.rejectedWith(NotFoundError, /^post not found$/));

  it("fails on non-string user-id", () =>
    expect(() => getComments(true, "012345678901234567890123")).to.throw(
      ValidationError,
      /^invalid userId$/
    ));

  it("fails on non-string post-id", () =>
    expect(() => getComments("012345678901234567890123", true)).to.throw(
      ValidationError,
      /^invalid postId$/
    ));

  after(() => db.disconnect());
});
