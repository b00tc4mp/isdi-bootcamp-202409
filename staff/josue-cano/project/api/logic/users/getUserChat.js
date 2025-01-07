import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async (chatId) => {
  try {
    
    const chat = await Chat.findById(chatId)
      .populate("messages")
      .sort({ "messages.createdAt": -1 });
    return chat;
  } catch (error) {
    console.log(error);
  }
};
// TODO:createSpecs