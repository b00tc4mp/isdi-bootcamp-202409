const net = require('net')

const clients = {}

const server = net.createServer(connection => {
    console.log('client connected')

    connection.on('data', data => {
        const message = JSON.parse(data.toString())

        if (message.type === 'id') {
            console.log(`client ${message.name} registered`)
            clients[message.name] = connection
        } else if (message.type === 'text') {
            const clientConnection = clients[message.to]

            if (!clientConnection) {
                connection.write(JSON.stringify({ type: 'error', message: 'recipient not found' }))

                return
            }

            clientConnection.write(JSON.stringify(`${message.from}: ${message.message}`))
        }
    })
})

server.on('error', error => console.log(error))

server.listen(6666, () => console.log('server up'))