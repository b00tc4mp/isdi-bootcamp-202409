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

    const post = new Post({
      author: user.id,
      image: "https://www.image.com",
      text: "hola mundo",
      comments: [comment, comment2],
    });

    return Promise.all([user.save(), user2.save(), post.save()]).then(
      ([user, user2, post]) =>
        getComments(user.id, post.id).then((comments) => {
          expect(comments).to.have.lengthOf(2);
          expect(comments[0].id).to.equal(comment.id);
          expect(comments[0].author.id).to.equal(user.id);
          expect(comments[0].author.username).to.equal(user.username);
          expect(comments[0].text).to.equal(comment.text);
          expect(comments[0].date).to.deep.equal(comment.date);

          expect(comments[1].id).to.equal(comment2.id);
          expect(comments[1].author.id).to.equal(user2.id);
          expect(comments[1].author.username).to.equal(user2.username);
          expect(comments[1].text).to.equal(comment2.text);
          expect(comments[1].date).to.deep.equal(comment2.date);
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
