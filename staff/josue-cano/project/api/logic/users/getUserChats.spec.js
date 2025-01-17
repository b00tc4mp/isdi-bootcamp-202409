import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const { expect } = chai;

import db, { User, Chat } from 'dat';
import { errors } from 'com';
const { ValidationError, NotFoundError } = errors; // Puedes omitir si no usas
import getUserChats from './getUserChats.js';

describe('getUserChats', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await Chat.deleteMany();
    await User.deleteMany();
  });

  after(() => db.disconnect());

  //
  // 1) Prueba: el usuario recupera TODOS sus chats
  //
  it('succeeds in retrieving chats for a valid user', async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "hashedpassword"
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword"
    });

    // Chat 1: owner = user1, peer = user2
    const chat1 = await Chat.create({
      owner: user1._id,
      peer: user2._id,
      messages: [{ author: user2._id, text: "Hello!" }]
    });

    // Chat 2: owner = user2, peer = user1
    const chat2 = await Chat.create({
      owner: user2._id,
      peer: user1._id,
      messages: [{ author: user1._id, text: "Hi there!" }]
    });

    // Llamamos a la función para obtener los chats de user1
    // Este "else" en getUserChats hace un find({ $or: [{ peer: user1 }, { owner: user1 }] })
    const chats = await getUserChats({ userId: user1._id });

    // Se esperan 2 chats (user1 es peer en el segundo, owner en el primero)
    expect(chats).to.be.an('array').that.has.lengthOf(2);
    expect(chats.map(chat => chat._id.toString())).to.include.members([
      chat1._id.toString(),
      chat2._id.toString()
    ]);
  });

  //
  // 2) Prueba: el usuario recupera "un" chat específico con productOwner
  //
  it('succeeds in retrieving chats for a user and productOwner', async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "hashedpassword"
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword"
    });

    // Para la consulta con { peer: user1, owner: user2 }, 
    // el chat que queremos que se halle es chat1
    // OJO: peer = user1, owner = user2
    const chat1 = await Chat.create({
      owner: user2._id,    // OJO inverso
      peer: user1._id,     // OJO inverso
      messages: [{ author: user1._id, text: "Hello from user1 to user2!" }]
    });

    // Creamos otro chat (chat2) que NO coincida con owner=user2 / peer=user1
    // para demostrar que la consulta sólo devuelve uno
    const chat2 = await Chat.create({
      owner: user1._id,
      peer: user2._id,
      messages: [{ author: user2._id, text: "Hi from user2 to user1!" }]
    });

    // Ahora, llamamos a getUserChats con userId=user1, productOwner=user2
    // => Se hace un findOne({ peer: user1, owner: user2 })
    const chats = await getUserChats({
      userId: user1._id,
      productOwner: user2._id
    });

    // Debería devolver UN ARRAY con EXACTAMENTE el chat1
    expect(chats).to.be.an('array').that.has.lengthOf(1);
    expect(chats[0]._id.toString()).to.equal(chat1._id.toString());
  });

  //
  // 3) Prueba: no hay chats en la BD, retorna array vacío
  //
  it('returns empty array when user has no chats', async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josue@test.com",
      password: "hashedpassword"
    });

    // Este usuario no tiene chats creados
    const chats = await getUserChats({ userId: user._id });

    expect(chats).to.be.an('array');
    expect(chats).to.have.lengthOf(0);
  });

  //
  // 4) (Opcional) Prueba: si no se encuentra un "singleChat" con productOwner, regresa []
  //
  it('returns empty array if singleChat is not found for given user and productOwner', async () => {
    const user1 = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josue@test.com",
      password: "hashedpassword"
    });

    const user2 = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "hashedpassword"
    });

    // No creamos chat con owner=user2 y peer=user1, así que la función no encuentra nada
    const chats = await getUserChats({
      userId: user1._id,
      productOwner: user2._id
    });

    expect(chats).to.be.an('array').that.has.lengthOf(0);
  });
});
