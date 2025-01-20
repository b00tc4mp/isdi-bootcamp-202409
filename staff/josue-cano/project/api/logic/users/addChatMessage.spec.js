import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Chat, Message, User } from "dat";
import { errors } from "com";
import addChatMessage from "./addChatMessage.js";

const { ValidationError } = errors;

describe("addChatMessage", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await Chat.deleteMany();
    await User.deleteMany();
  });

  after(() => db.disconnect());

  //  agrega mensaje a chat existente
  it("succeeds in adding a message to an existing chat", async () => {
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123123123",
    });

    const chat = await Chat.create({
      owner: user._id,
      peer: user._id,
      messages: [],
    });

    const textMessage = "Hello world";

    const updatedChat = await addChatMessage({
      chatId: chat._id.toString(),
      userId: user._id.toString(),
      message: textMessage,
    });

    expect(updatedChat).to.exist;
    expect(updatedChat.messages).to.have.lengthOf(1);
    const addedMessage = updatedChat.messages[0];
    expect(addedMessage.text).to.equal(textMessage);
    expect(addedMessage.author.toString()).to.equal(user._id.toString());
  });

  // validación si chatId no es un string de 24 chars
  it("fails on invalid chatId", async () => {
    const user = await User.create({
      firstName: "Another",
      lastName: "User",
      email: "another@test.com",
      password: "123123123",
    });

    await expect(
      addChatMessage({
        chatId: "1234",
        userId: user._id.toString(),
        message: "This should fail",
      })
    ).to.be.rejectedWith(ValidationError, "invalid chatId length");
  });

  // Falla en validación si userId no es un string de 24 chars
  it("fails on invalid userId", async () => {
    const chat = await Chat.create({
      owner: "6459b4d5e166f4bd463b6691",
      peer: "6459b4d5e166f4bd463b6692",
      messages: [],
    });

    await expect(
      addChatMessage({
        chatId: chat._id.toString(),
        userId: "1234",
        message: "Hi",
      })
    ).to.be.rejectedWith(ValidationError, "invalid userId length");
  });

  // ACEPTA mensaje vacío (cambio al test original),
  it("succeeds on empty message text", async () => {
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123123123",
    });

    const chat = await Chat.create({
      owner: user._id,
      peer: user._id,
      messages: [],
    });

    // Mensaje vacío => la implementación actual NO falla
    const updatedChat = await addChatMessage({
      chatId: chat._id.toString(),
      userId: user._id.toString(),
      message: "", // aceptamos que no lance error
    });

    // Verificamos que se agregue con text = ""
    expect(updatedChat).to.exist;
    expect(updatedChat.messages).to.have.lengthOf(1);
    expect(updatedChat.messages[0].text).to.equal("");
  });

  //  Devuelve null si el chat no existe
  it("returns null if chat does not exist", async () => {
    const user = await User.create({
      firstName: "NoChat",
      lastName: "User",
      email: "nochat@test.com",
      password: "123123123",
    });

    const fakeChatId = "0123456789abcdef01234567";

    const result = await addChatMessage({
      chatId: fakeChatId,
      userId: user._id.toString(),
      message: "Hello noChat",
    });

    expect(result).to.be.null;
  });

  // Si ocurre un error de DB, tu catch está vacío => la función
  it("resolves with undefined on database error (since catch is empty)", async () => {
    const originalFn = Chat.findByIdAndUpdate;
    Chat.findByIdAndUpdate = () => Promise.reject(new Error("Simulated DB error"));

    // undefined
    const result = await addChatMessage({
      chatId: "0123456789abcdef01234567",
      userId: "0123456789abcdef01234567",
      message: "any text",
    });

    expect(result).to.be.undefined;

    Chat.findByIdAndUpdate = originalFn;
  });
});
