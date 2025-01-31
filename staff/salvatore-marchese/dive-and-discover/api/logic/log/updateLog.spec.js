import updateLog from "../log/updateLog.js";
import { User, LogBook } from "dat";
import { validate, errors } from "com";
import castLogbookData from "../../utils/parseInfo.js";

const { SystemError, NotFoundError } = errors;

describe("updateLog", () => {
  const userId = "676310ec365df2fb2590cf5e";
  const logbookId = "6765d2b1da01678bbab8b023";
  const updateData = {
    depth: "30",
    time: "45",
  };

  // Stubs for database and utility functions
  beforeEach(() => {
    // Stub `validate` methods
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

  it("should throw a SystemError if fetching the user fails", async () => {
    User.findById = async () => {
      throw new Error("Database error");
    };
    await expect(updateLog(userId, logbookId, updateData)).rejects.toThrow(SystemError);
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
});