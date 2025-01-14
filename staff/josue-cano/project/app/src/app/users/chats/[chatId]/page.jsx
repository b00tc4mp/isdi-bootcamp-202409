"use client";

import { getChat } from "@/app/logic/users/getChat";
import { sendMessage } from "@/app/logic/users/sendMessage";
import ChatComponent from "@/app/ui/ChatComponent";
import useAuth from "@/app/utils/handlers/useAuth";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Chats() {

  useAuth();

  const [chat, setChat] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { chatId } = useParams();

  useEffect(() => {
    async function findChat() {
      const response = await getChat(chatId);
      if (response) setChat(response);
    }

    setInterval(async () => {
      await findChat();
    }, 5000);

    findChat();
  }, [chatId]);

  const sendChat = async (message) => {
    // owner es quien publicó el producto
    // el id de ususario se obtiene del token

    let response = await sendMessage({ message, chatId });
    
    response = await response.json();
    // cuando se recibe el chat, se redirige a la nueva página
    if (response.data) {
      setChat(response.data);
    }
  };

  return (
    <section className="py-5">
      <ChatComponent messages={chat?.messages} sendMessage={sendChat} />
    </section>
  );
}
