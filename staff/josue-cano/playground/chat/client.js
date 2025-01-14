// Importa el módulo 'net' de Node.js para crear conexiones de red TCP.
const net = require('net')

// Importa el módulo 'readline' de Node.js para manejar la entrada y salida del usuario en la consola.
const readline = require('readline')

// Crea una conexión TCP hacia el servidor en el puerto 8888.
const client = net.createConnection( { port: 8888 }  /*8888, "192.168.1.142"*/, () => {
    // Imprime en la consola cuando se conecta exitosamente al servidor.
    console.log('connected to server')

    // Configura una interfaz de lectura de línea para interactuar con el usuario en la consola.
    const rl = readline.createInterface({
        input: process.stdin,  // Entrada del usuario desde la consola.
        output: process.stdout, // Salida para mostrar texto al usuario.
    })

    // Pregunta al usuario su nombre.
    rl.question('who are you? ', name => {
        // Envía al servidor un mensaje en formato JSON con el nombre del cliente para registrarlo.
        client.write(JSON.stringify({ type: 'id', name }))
        const from = name;

        // Define la función `chat` para manejar el envío de mensajes entre clientes.
        function chat() {
            // Pregunta a qué cliente quiere enviar un mensaje.
            rl.question('write to? ', name => {
             
                // Pregunta el contenido del mensaje que quiere enviar.
                rl.question('what message? \n', message => {
                    // Envía el mensaje en formato JSON al servidor, indicando destinatario y contenido.
                    for (let index = 0; index < 10000000; index++) {
                        client.write(JSON.stringify({ type: 'text', to: name, message, from }))
                        
                    }
                    // Llama nuevamente a la función `chat` para permitir enviar otro mensaje.
                    chat()
                })
            })
        }

        // Inicia el chat después de que el usuario se ha registrado con su nombre.
        chat()
    })

    // Evento que se dispara cuando se recibe un mensaje de datos del servidor.
    client.on('data', data => console.log(data.toString())) // Muestra en la consola el mensaje recibido.
})
