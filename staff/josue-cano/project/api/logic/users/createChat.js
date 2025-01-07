import { Chat, Message } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ productOwner, userId, message }) => {
  console.log({ productOwner, message, userId });
  try {
    const chat = new Chat({
      owner: productOwner,
      peer: userId,
      messages: [new Message({ author: userId, text: message })],
    });

    await chat.save();

    return chat._id;
  } catch (error) {
    console.log(error);
  }
};
// TODO:createSpecs