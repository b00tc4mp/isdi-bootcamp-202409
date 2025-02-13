import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async (chatId) => {
  validate.id(chatId, "chatId");
  try {
    const chat = await Chat.findById(chatId)
      .populate("messages")

      .sort({ "messages.createdAt": -1 });

    return chat;
  } catch (error) {
    console.log(error);
  }
};
