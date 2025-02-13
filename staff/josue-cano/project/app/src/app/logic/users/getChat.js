import { validate } from "com";
import { getToken } from "../../utils/session";

export async function getChat(chatId) {
  validate.id(chatId);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/users/chat/${chatId}`;
  const token = `Bearer ${getToken()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    // alert(error);
    return error;
  }
}
