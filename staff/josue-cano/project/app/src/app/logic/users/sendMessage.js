import fetchHandler from "@/app/utils/handlers/fetchHandler";

export const sendMessage = async ({
  chatId, message
}) => {
  const url = 'user/chat/message';

  try {
  const result = await fetchHandler(url, {
    method: 'POST',
    body: JSON.stringify({message, chatId})
  });

  return result;

    
  } catch (e) {
    /* handle error */
    console.error(e);
  }


};
