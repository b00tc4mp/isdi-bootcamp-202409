import { validate } from "com";
import { getToken } from "../../utils/session";

export const sendMessage = async ({ chatId, message }) => {
  validate.id(chatId);
  validate.text(message);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/users/chat/message`;

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ message, chatId }),
    });

    return result;
  } catch (e) {
    /* handle error */
    console.error(e);
  }
};
