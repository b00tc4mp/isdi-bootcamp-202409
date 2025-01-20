import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Chat, User } from "dat";
import { errors } from "com";
import getUserChat from "./getUserChat.js";

const { ValidationError } = errors;

describe("getUserChat", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await Chat.deleteMany();
    await User.deleteMany();
  });

  after(() => db.disconnect());

  //  chatId no tiene 24 chars
  it("fails on invalid chatId", async () => {
    await expect(getUserChat("1234")).to.be.rejectedWith(ValidationError, "invalid chatId length");
  });

  // Retorna null si no encuentra el chat
  it("returns null if no chat found with given id", async () => {
    const fakeId = "0123456789abcdef01234567";
    const chat = await getUserChat(fakeId);
    expect(chat).to.be.null;
  });

  // Retorna el chat con sus mensajes embebidos
  it("succeeds returning the chat with messages in insertion order", async () => {
    const user1 = await User.create({
      firstName: "User",
      lastName: "One",
      email: "user1@test.com",
      password: "123123123",
    });

    const user2 = await User.create({
      firstName: "User",
      lastName: "Two",
      email: "user2@test.com",
      password: "123123123",
    });

    // Creamos un chat
    const chat = await Chat.create({
      owner: user1._id,
      peer: user2._id,
      messages: [
        {
          author: user1._id,
          text: "First message",
          createdAt: new Date("2025-01-10T10:00:00Z"),
        },
        {
          author: user2._id,
          text: "Second message",
          createdAt: new Date("2025-01-11T10:00:00Z"),
        },
        {
          author: user1._id,
          text: "Third message",
          createdAt: new Date("2025-01-12T10:00:00Z"),
        },
      ],
    });

    // Llamamos a getUserChat
    const foundChat = await getUserChat(chat._id.toString());

    expect(foundChat).to.exist;
    expect(foundChat._id.toString()).to.equal(chat._id.toString());
    expect(foundChat.messages).to.have.lengthOf(3);

    // Verificamos que se conserven en el orden de inserción
    expect(foundChat.messages[0].text).to.equal("First message");
    expect(foundChat.messages[1].text).to.equal("Second message");
    expect(foundChat.messages[2].text).to.equal("Third message");
  });
});
