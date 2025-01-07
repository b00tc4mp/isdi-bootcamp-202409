import { Chat, Message } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ chatId, userId, message }) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { $addToSet: { messages: new Message({ author: userId, text: message }) } },
      { new: true }
    );
    return chat;
  } catch (error) {
    console.log(error);
  }
};
// TODO:createSpecs