import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getChats( productOwner ) {
  const url = `user/chats/`;

  try{
    const response = await fetchHandler(url, {
      method: 'POST',
      body: JSON.stringify({productOwner})
    });

    return response.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
