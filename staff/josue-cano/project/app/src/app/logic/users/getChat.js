import { getToken } from "../../utils/session";

export async function getChat( chatId ) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/user/chat/${chatId}`;
  const token = `Bearer ${getToken()}`;
  try{
    const response = await fetch(url, { 
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        Authorization: token 
      },
    });

    const data = await response.json();

    return data.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
