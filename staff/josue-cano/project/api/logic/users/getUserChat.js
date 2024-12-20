import { Chat } from "dat";
import { validate, errors } from "com";

const { SystemError } = errors;

export default async (chatId) => {
  try {
    // const user = await User.findOne({ _id: id });
    // if (!user) {
    //   throw new NotFoundError("No se encontró un usuario con el ID proporcionado.");
    // }
    //const chats = await Comment.find({ product: productId, $or: [{writer: userId, reader: userId}]}).lean();
    const chat = await Chat.findById(chatId)
      .populate("messages")
      // .populate('peer')
      // .populate('owner')
      .sort({ "messages.createdAt": -1 });

    //.lean();

    return chat;
  } catch (error) {
    console.log(error);
  }
};
