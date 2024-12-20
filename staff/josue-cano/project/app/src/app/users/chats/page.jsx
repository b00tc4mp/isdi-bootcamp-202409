"use client";
import { getChats } from "@/app/logic/users/getChats";
import { getUserId } from "@/app/utils/session";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function chats() {
  const [chats, setChats] = useState(null);

  const userId = getUserId();
  useEffect(() => {
    async function getuserChats() {
      const chats = await getChats();
      setChats(chats);
    }
    getuserChats();
  }, []);

  return (
    <section className="py-5">
      <header>
        <h2 className="text-2xl">Mensajes</h2>
      </header>
      {chats &&
        chats.map((chat) => {
          return (
            <Link href={`/users/chats/${chat._id}`} key={chat._id} role="alert" className="alert mb-1">
              <span>
                {chat.peer._id == userId
                  ? chat.owner.firstName + " " + chat.owner.lastName
                  : chat.peer.firstName + " " + chat.peer.lastName}
              </span>
            </Link>
          );
        })}
    </section>
  );
}
