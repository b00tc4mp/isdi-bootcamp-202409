import { getToken } from "../../utils/session";

export const createChat = async ({ owner, message }) => {
  const token = getToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${baseUrl}/user/chat/`;

  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ message, productOwner: owner }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      throw new Error(result.error);
    }
    const response = await result.json();

    return response.data;
  } catch (e) {
    /* handle error */
    console.error(e);
  }
};
