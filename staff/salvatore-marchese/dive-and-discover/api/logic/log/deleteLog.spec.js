import deleteLog from "./deleteLog.js";
import { User, LogBook } from "dat";
import { errors } from "com";

const { NotFoundError, SystemError } = errors;

describe("deleteLog", () => {
  const userId = "67a127a2f0f8a331c710e137";
  const logbookId = "67a1de8054cdc6e22b6f2507";

  beforeEach(() => {
    User.findById = async (id) => {
      if (id === userId) {
        return { _id: id, name: "Salva" };
      }
      return null;
    };

    LogBook.findById = async (id) => {
      if (id === logbookId) {
        return { _id: id, diver: userId };
      }
      return null;
    };

    LogBook.findByIdAndDelete = async (id) => {
      if (id === logbookId) {
        return { _id: id, diver: userId };
      }
      throw new Error("Database error");
    };
  });

  it("should successfully delete a logbook", async () => {
    const result = await deleteLog(userId, logbookId);
    expect(result).toEqual({ message: "Logbook deleted successfully" });
  });

  it("should throw NotFoundError if the user is not found", async () => {
    User.findById = async () => null; // Simulate user not found
    await expect(deleteLog(userId, logbookId)).rejects.toThrow(NotFoundError);
    await expect(deleteLog(userId, logbookId)).rejects.toThrow("User not found");
  });

  it("should throw NotFoundError if the logbook is not found", async () => {
    LogBook.findById = async () => null; // Simulate logbook not found
    await expect(deleteLog(userId, logbookId)).rejects.toThrow(NotFoundError);
    await expect(deleteLog(userId, logbookId)).rejects.toThrow("Logbook not found");
  });

  it("should throw SystemError if the user fetching fails", async () => {
    User.findById = async () => { throw new Error("Database error"); };
    await expect(deleteLog(userId, logbookId)).rejects.toThrow(SystemError);
  });

  it("should throw SystemError if deleting the logbook fails", async () => {
    LogBook.findByIdAndDelete = async () => { throw new Error("Database error"); };
    await expect(deleteLog(userId, logbookId)).rejects.toThrow(SystemError);
  });
});