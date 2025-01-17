import { Chat, Message, User } from "dat";
import { validate, errors } from "com";

const { ValidationError, SystemError } = errors;
// VALIDAR PRODUCT OWNER, USERID, MESSAGE
// productOwner: id del usuario que es dueño del producto
export default async ({ productOwner, userId, message }) => {
  if (productOwner) validate.id(productOwner, "productOwner");
  if (userId) validate.id(userId, "userId");
  if (message) validate.text(message);

  try {
    // Validation for required fields
    validate.chat({ productOwner, userId, message });

    // Verify existence of productOwner
    const owner = await User.findById(productOwner);
    if (!owner) {
      throw new ValidationError("product owner not found");
    }

    // Verify existence of userId
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("user not found error");
    }

    const chat = await Chat.create({
      owner: productOwner,
      peer: userId,
      messages: [new Message({ author: userId, text: message })],
    });

    return chat._id;
  } catch (error) {
    throw error;
  }
};
