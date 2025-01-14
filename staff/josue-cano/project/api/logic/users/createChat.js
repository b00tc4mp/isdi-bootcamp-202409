import { Chat, Message } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ productOwner, userId, message }) => {
  console.log({ productOwner, message, userId });
  try {
    const chat = await Chat.create({
      owner: productOwner,
      peer: userId,
      messages: [new Message({ author: userId, text: message })],
    });

    return chat._id;
  } catch (error) {
    console.log(error);
  }
};
