'use client'
import {createChat} from "@/app/logic/users/createChat";
import ChatComponent from "@/app/ui/ChatComponent"
import {useParams} from "next/navigation";

export default function Chat () {


    const { authorId } = useParams();

    const messages = '';
    // const chat = '';
    // TODO: revisar si existe un chat previo entre el cliente y el 
    // autor
    //
    // si existe se redirige al chat existente
    // de lo contrario se envía el mensaje, luego se redirige al 
    // chat recién creado
    //
    //
    const sendMessage = async ({message}) => {
        // owner es quien publicó el producto
        // el id de ususario se obtiene del token

        const newChat = await createChat({message, owner: authorId});
        // cuando se recibe el chat, se redirige a la nueva página
        console.log({newChat});

    }


    return <section className="py-5">
<ChatComponent messages={messages} sendMessage={sendMessage}/>


        </section>

}
