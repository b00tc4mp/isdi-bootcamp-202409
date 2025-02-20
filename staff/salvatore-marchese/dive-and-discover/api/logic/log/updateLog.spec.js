import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose

import db, { User, LogBook } from "dat";
import { errors } from "com";

import updateLog from "../log/updateLog.js";
import castLogbookData from "../../utils/parseInfo.js";

chai.use(chaiAsPromised)
const { expect } = chai
const { NotFoundError } = errors


describe("updateLog", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(async () => {
    await User.deleteMany()
    await LogBook.deleteMany()
  })

  it('should update log successfully', async () => {
    const user = await User.create({
      name: 'Salva',
      email: 'salva@gmail.com',
      password: '123123123',
      role: 'diver',
    })

    const log = await LogBook.create({
      diver: user.id,
      diveSite: 'Barcelona',
      date: '01-17-2024',
      depth: '10',
      time: '30',
      weather: 'Sunny',
      temperature: '24',
      visibility: 'Good',
      waves: 'Low',
      wetSuit: '5',
      weight: '6',
      tankSize: '12',
      tankBar: '200',
      feeling: 'Amazing',
      diveCenter: 'Tossa Divers',
      notes: 'Muchos cegarro amego'
    })

    const updateData = {
      depth: 30,
      time: 45,
    }

    await updateLog(user.id, log.id, updateData)

    const newUpdatedData = await LogBook.findById(log.id)

    expect(newUpdatedData.depth).to.equal(updateData.depth)
    expect(newUpdatedData.time).to.equal(updateData.time)
  })

  it('fails on non-existing logbook', async () => {
    const user = await User.create({
      name: 'Salva',
      email: 'salva@gmail.com',
      password: '123123123',
      role: 'diver',
    })

    const randomLogId = new ObjectId().toString()

    const updateData = {
      depth: 30,
      time: 45,
    }

    return expect(updateLog(user.id, randomLogId, updateData))
      .to.be.rejectedWith(NotFoundError, 'logbook not found')
  })

  it('fails on non-existing user', async () => {
    const randomUserId = new ObjectId().toString() 
    const randomLogId = new ObjectId().toString()

    const updateData = {
      depth: 30,
      time: 45,
    }

    return expect(updateLog(randomUserId, randomLogId, updateData))
      .to.be.rejectedWith(NotFoundError, 'user not found')
  })

  after(() => db.disconnect())

})


/* beforeEach(() => {
  validate.id = (id, name) => {
    if (!id) throw new Error(`${name} is invalid`);
  };

  validate.updateData = (data, name) => {
    if (!data || typeof data !== "object") throw new Error(`${name} is invalid`);
  };

  // Stub `castLogbookData` to parse data
  castLogbookData = (data) => {
    return {
      depth: parseInt(data.depth, 10),
      time: parseInt(data.time, 10),
    };
  };

  // Stub `User.findById`
  User.findById = async (id) => {
    if (id === userId) {
      return { _id: id, name: "676310ec365df2fb2590cf5e" };
    }
    return null;
  };

  // Stub `LogBook.findById`
  LogBook.findById = async (id) => {
    if (id === logbookId) {
      return { _id: id, name: "6765d2b1da01678bbab8b023" };
    }
    return null;
  };

  // Stub `LogBook.findByIdAndUpdate`
  LogBook.findByIdAndUpdate = async (id, update) => {
    if (id === logbookId) {
      return { _id: id, ...update.$set };
    }
    throw new Error("Database error");
  };
});

it("should validate the input parameters", async () => {
  await expect(updateLog(userId, logbookId, updateData)).resolves.not.toThrow();
});

it("should throw a NotFoundError if the user is not found", async () => {
  User.findById = async () => null; // Simulate user not found
  await expect(updateLog(userId, logbookId, updateData)).rejects.toThrow(NotFoundError);
});

it("should throw a NotFoundError if the logbook is not found", async () => {
  LogBook.findById = async () => null; // Simulate logbook not found
  await expect(updateLog(userId, logbookId, updateData)).rejects.toThrow(NotFoundError);
});


it("should throw a SystemError if updating the logbook fails", async () => {
  LogBook.findByIdAndUpdate = async () => {
    throw new Error("Database error");
  };
  await expect(updateLog(userId, logbookId, updateData)).rejects.toThrow(SystemError);
});

it("should successfully update the logbook with parsed data", async () => {
  const result = await updateLog(userId, logbookId, updateData);
  expect(result).toEqual({
    _id: logbookId,
    depth: 30,
    time: 45,
  });
});
}); */