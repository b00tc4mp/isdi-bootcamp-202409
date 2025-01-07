"use client";

import { useEffect, useState } from "react";
import { getUserId } from "../utils/session";

export default function ChatComponent ({ messages, sendMessage }) {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const onMessageHandler = () => {
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
        <input
          type="text"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          placeholder="Escribe un mensaje"
          className="input input-bordered w-full max-w-full"
        />
        <button onClick={onMessageHandler} className="btn btn-sm mt-2 btn-primary text-white">
          Enviar
        </button>
      </section>
    </article>
  );
};
