import { Chat, Message } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ chatId, userId, message }) => {
  validate.id(chatId, "chatId");
  validate.id(userId, "userId");
  validate.text(message);

  try {
    const chat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { $addToSet: { messages: new Message({ author: userId, text: message }) } },
      { new: true }
    );

    // await chat.save();

    return chat;
  } catch (error) {}
};
