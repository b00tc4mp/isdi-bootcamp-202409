import { validate } from "com";
import { getToken } from "../../utils/session";

export async function getChats(productOwner) {
  if (productOwner) validate.id(productOwner);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const token = `Bearer ${getToken()}`;

  const url = `${baseUrl}/users/chats/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ productOwner }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });
    const data = await response.json();
    return data.data;

  } catch (error) {

    // alert(error);
    return error;

  }

}
