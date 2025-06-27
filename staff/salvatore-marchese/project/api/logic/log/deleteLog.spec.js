import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import mongoose from 'mongoose'
const { Types: { ObjectId } } = mongoose

import deleteLog from "./deleteLog.js";
import db, { User, LogBook } from "dat";
import { errors } from "com";


const { NotFoundError, SystemError } = errors;

describe("deleteLog", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(async () => {
    Promise.all([
      await LogBook.deleteMany(),
      await User.deleteMany()
    ])
  });

  it("should successfully delete a logbook", async () => {
    const user = await User.create({
      name: 'Test Diver',
      email: 'testdiver@example.com',
      password: 'password123',
      role: 'diver'
    })

    const logbook = await LogBook.create({
      diver: user.id,
      date: '01/09/2024',
      depth: 18,
      time: 45,
      weather: 'cloudy',
      temperature: 15,
      visibility: 'good',
      waves: 'calm',
      wetSuit: 5,
      weight: 6,
      tankSize: 12,
      tankBar: 200,
      feeling: 'really good',
      diveCenter: 'Tossa Diver',
      diveSite: 'Tossa de Mar',
      notes: 'was a very good day',
    })

    await deleteLog(user.id, logbook.id);

    const log = await LogBook.findById(logbook.id)

    expect(log).to.equal(null);
  });

  it("should throw NotFoundError if the user is not found", async () => {
    

    const randomUserId = new ObjectId().toString()
    const randomLogbookId = new ObjectId().toString()

    
    await expect(deleteLog(randomUserId, randomLogbookId)).to.be.rejectedWith(NotFoundError, 'User not found')
  });

  it("should throw NotFoundError if the logbook is not found", async () => {
    const user = await User.create({
      name: 'Test Diver',
      email: 'testdiver@example.com',
      password: 'password123',
      role: 'diver'
    })

    const randomLogbookId = new ObjectId().toString()

    
    await expect(deleteLog(user.id, randomLogbookId)).to.be.rejectedWith(NotFoundError, 'Logbook not found')
  });

  after(() => db.disconnect())
});