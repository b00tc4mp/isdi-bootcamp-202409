const net = require('net')

//Guardamos los clientes que se conectan
const clients = {}

const server = net.createServer(connection => {
    console.log('client connected')

    connection.on('data', data => {
        const message = JSON.parse(data.toString())

        if (message.type === 'id') {
            console.log(`client ${message.from} connected`)
            clients[message.from] = connection

        } else if (message.type === 'text') {
            const clientConnection = clients[message.to]

            if (!clientConnection) {
                connection.write(JSON.stringify({ type: 'error', message: 'client not found' }))

                return
            }

            //client.write(JSON.stringify(message))
            //clientConnection.write(JSON.stringify(`${message.from} says: ${message.message}`))
            clientConnection.write(JSON.stringify(message))
        }
    })
})

server.on('error', error => console.error(error))
server.listen(8888, () => console.log('server up'))