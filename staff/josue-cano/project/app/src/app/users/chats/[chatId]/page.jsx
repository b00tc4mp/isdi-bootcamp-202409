"use client";

import { getChat } from "@/app/logic/users/getChat";
import { sendMessage } from "@/app/logic/users/sendMessage";
import ChatComponent from "@/app/ui/ChatComponent";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Chats() {
  const [chat, setChat] = useState(null);
  const { chatId } = useParams();

  sendMessage;

  // const messages = '';
  useEffect(() => {
    async function findChat() {
      console.log("buscando a chat");
      const response = await getChat(chatId);
      if (response) setChat(response);
    }

    if (chat == null) findChat();
  }, [chat]);
  const sendChat = async (message) => {
    // owner es quien publicó el producto
    // el id de ususario se obtiene del token

    const response = await sendMessage({ message, chatId });
    // cuando se recibe el chat, se redirige a la nueva página
    if (response.data) {
      setChat(response.data);
    }
  };

  return (
    <section className="mx-5 py-5">
      <ChatComponent messages={chat?.messages} sendMessage={sendChat} />
    </section>
  );
}
