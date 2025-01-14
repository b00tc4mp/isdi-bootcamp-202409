import { Chat, Message } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ chatId, userId, message }) => {
  // console.log({productOwner, message, userId});
  try {
    const chat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { $addToSet: { messages: new Message({ author: userId, text: message }) } },
      { new: true }
    );

    // await chat.save();

    return chat;
  } catch (error) {
    console.log(error);
  }
};
