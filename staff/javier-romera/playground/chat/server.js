const net = require('net')

const clients = {}

const server = net.createServer(connection => {
    console.log('client connected')

    connection.on('data', data => {
        const message = JSON.parse(data.toString())
        console.log(message)

        if (message.type === 'id') {
            console.log(`client ${message.from} registered`)
            clients[message.from] = connection
        } else if (message.type === 'text') {
            const clientConnection = clients[message.to]

            if (!clientConnection) {
                connection.write(JSON.stringify({ type: 'error', message: 'client not found' }))

                return
            }
            clientConnection.write(JSON.stringify(`${message.message} from ${message.from}`))
        }
    })
})

server.on('error', error => console.error(error))

server.listen(8888, () => console.log('server up'))