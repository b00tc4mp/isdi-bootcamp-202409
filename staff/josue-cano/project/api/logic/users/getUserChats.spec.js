import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const { expect } = chai;

import db, { User, Chat } from "dat";
import { errors } from "com";
const { ValidationError, NotFoundError } = errors;
import getUserChats from "./getUserChats.js";

describe("getUserChats", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await Chat.deleteMany();
    await User.deleteMany();
  });

  after(() => db.disconnect());

  it("succeeds in retrieving chats for a valid user", async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "hashedpassword",
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword",
    });

    const chat1 = await Chat.create({
      owner: user1._id,
      peer: user2._id,
      messages: [{ author: user2._id, text: "Hello!" }],
    });

    const chat2 = await Chat.create({
      owner: user2._id,
      peer: user1._id,
      messages: [{ author: user1._id, text: "Hi there!" }],
    });

    const chats = await getUserChats({ userId: user1._id.toString() });

    expect(chats).to.be.an("array").that.has.lengthOf(2);
    expect(chats.map((chat) => chat._id.toString())).to.include.members([chat1._id.toString(), chat2._id.toString()]);
  });

  it("succeeds in retrieving a single chat for a user and productOwner", async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "hashedpassword",
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword",
    });

    const chat1 = await Chat.create({
      owner: user2._id,
      peer: user1._id,
      messages: [{ author: user1._id, text: "Hello from user1 to user2!" }],
    });

    const chat2 = await Chat.create({
      owner: user1._id,
      peer: user2._id,
      messages: [{ author: user2._id, text: "Hi from user2 to user1!" }],
    });

    const chat = await getUserChats({
      userId: user1._id.toString(),
      productOwner: user2._id.toString(),
    });

    expect(chat).to.be.an("object");
    expect(chat._id.toString()).to.equal(chat1._id.toString());
  });

  it("returns empty array when user has no chats", async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josue@test.com",
      password: "hashedpassword",
    });

    const chats = await getUserChats({ userId: user._id.toString() });

    expect(chats).to.be.an("array");
    expect(chats).to.have.lengthOf(0);
  });

  it("returns null if singleChat is not found for given user and productOwner", async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josue@test.com",
      password: "hashedpassword",
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword",
    });

    const chat = await getUserChats({
      userId: user1._id.toString(),
      productOwner: user2._id.toString(),
    });
    expect(chat).to.be.null;
  });
});
