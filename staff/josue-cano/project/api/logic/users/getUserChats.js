import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async ({ userId, productOwner }) => {
  try {
    // const user = await User.findOne({ _id: id });
    // if (!user) {
    //   throw new NotFoundError("No se encontró un usuario con el ID proporcionado.");
    // }
    //const chats = await Comment.find({ product: productId, $or: [{writer: userId, reader: userId}]}).lean();
    console.log({ productOwner, userId });
    let chats = [];
    if (productOwner) {
      chats = await Chat.findOne({ $and: [{ peer: userId }, { owner: productOwner }] }); //.lean();
    } else {
      console.log("buscando todos los chats");
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
