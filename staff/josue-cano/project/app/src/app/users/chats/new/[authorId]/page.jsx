'use client'
import {createChat} from "@/app/logic/users/createChat";
import {getChats} from "@/app/logic/users/getChats";
import ChatComponent from "@/app/ui/ChatComponent"
import {redirect, useParams} from "next/navigation";
import {useEffect} from "react";

export default function chat () {


    const { authorId } = useParams();

    const messages = '';
    // const chat = '';
    // TODO: revisar si existe un chat previo entre el cliente y el 
    // autor
    useEffect(() => {
        async function findChat() {

            debugger;
            const response = await getChats(authorId);
            if(response)
                redirect(`/users/chats/${response._id}`);

        }

        findChat()
    }, []);
    // si existe se redirige al chat existente
    // de lo contrario se envía el mensaje, luego se redirige al 
    // chat recién creado
    //
    //
    const sendMessage = async (message) => {
        // owner es quien publicó el producto
        // el id de ususario se obtiene del token

        const newChat = await createChat({message, owner: authorId});
        // cuando se recibe el chat, se redirige a la nueva página
        if(newChat.data) {
            
            redirect(`/users/chats/${newChat.data}`);

        }
    }

    return <section className="py-5">
        <ChatComponent messages={messages} sendMessage={sendMessage}/>


        </section>

}

