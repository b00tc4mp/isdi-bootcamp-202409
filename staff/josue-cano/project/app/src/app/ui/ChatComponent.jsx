"use client";

import { useEffect, useState } from "react";
import { getUserId } from "../utils/session";

export default function ChatComponent ({ messages, sendMessage }) {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const onMessageHandler = (evt) => {
    evt.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <article className="">
      <section className="">
        {messages &&
          messages.map((message) => {
            return (
              <div key={message._id} className={userId == message.author ? "chat chat-end" : "chat chat-start"}>
                <div className="chat-bubble">{message.text}</div>
              </div>
            );
          })}
      </section>
      <div className="divider"></div>

      <section className="">
        <form
        onSubmit={(evt) => onMessageHandler(evt)}
        className="flex items-center bg-white rounded-lg shadow-lg w-full overflow-hidden border border-gray-300"
      >
        {/* Submits form on ENTER */}
        <input
          type="text"
          onChange={(evt) => setMessage(evt.target.value)}
          value={message}
          placeholder="Escribe un mensaje"
          className="flex-grow px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-3 hover:bg-green-700 transition duration-300 font-semibold shadow-md rounded-r-lg"
        >
          Enviar
        </button>
      </form>
      </section>
    </article>
  );
};
