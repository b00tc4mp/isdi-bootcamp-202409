import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ userId, productOwner }) => {
  try {
    console.log({ productOwner, userId });
    let chats = [];
    if (productOwner) {
      chats = await Chat.findOne({ $and: [{ peer: userId }, { owner: productOwner }] });
      console.log("buscando todos los chats");
      chats = await Chat.find({ $or: [{ peer: userId }, { owner: userId }] })
        .populate("owner")
        .populate("peer");
    }

    return chats;
  } catch (error) {
    console.log(error);
  }
};
// TODO:createSpecs