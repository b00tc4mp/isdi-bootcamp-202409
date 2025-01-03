import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getChat( chatId ) {
  const url = `user/chat/${chatId}`;

  try{
    const response = await fetchHandler(url, { });

    return response.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
