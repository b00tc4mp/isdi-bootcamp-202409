import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ userId, productOwner }) => {
  if (productOwner) validate.id(productOwner, "productOwner");
  if (userId) validate.id(userId, "userId");

  try {
    let chats = [];
    if (productOwner) {
      chats = await Chat.findOne({ $and: [{ peer: userId }, { owner: productOwner }] }); //.lean();
    } else {
      chats = await Chat.find({ $or: [{ peer: userId }, { owner: userId }] })
        .populate("owner")
        .populate("peer");
      //.lean();
    }

    return chats;
  } catch (error) {
    console.log(error);
  }
};
