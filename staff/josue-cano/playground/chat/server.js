// Importa el módulo 'net' de Node.js para crear un servidor TCP.
const net = require('net')

// Declara un objeto vacío para almacenar las conexiones de los clientes.
const clients = {}

// Crea el servidor TCP, manejando cada conexión nueva con esta función.
const server = net.createServer(connection => { 
    // Imprime en la consola cuando un cliente se conecta.
    console.log('client connected') 

    // Evento para manejar los datos recibidos desde el cliente.
    connection.on('data', data => { 
        // Convierte los datos de Buffer a cadena y luego a objeto JSON.
        const message = JSON.parse(data.toString()) 

        // Verifica si el tipo de mensaje es 'id', que significa registro del cliente.
        if (message.type === 'id') { 
            // Muestra el nombre del cliente registrado en la consola.
            console.log(`client ${message.name} registered`) 
            // Guarda la conexión del cliente en el objeto 'clients', usando su nombre como clave.
            clients[message.name] = connection 
        } 
        // Si el tipo de mensaje es 'text', es un mensaje para otro cliente.
        else if (message.type === 'text') { 
            // Busca la conexión del cliente destinatario usando el nombre en 'to'.
            const client = clients[message.to] 

            // Si el cliente destinatario no está registrado...
            if (!client) { 
                // Envía un mensaje de error al cliente emisor.
                connection.write(JSON.stringify({ type: 'error', message: 'client not found' })) 
                // Finaliza la función si el destinatario no existe.
                return 
            }

            // Si el destinatario existe, reenvía el mensaje a su conexión. aqui se imprime
            client.write(JSON.stringify(`${message.from} : ${message.message}`)) 
        }
    })
})

// Maneja errores en el servidor y los muestra en la consola.
server.on('error', error => console.error(error)) 

// Inicia el servidor en el puerto 8888 y confirma que está en ejecución.
server.listen(8888, () => console.log('server up')) 
