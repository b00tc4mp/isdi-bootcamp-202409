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
            const client = clients[message.to]

            if (!client) {
                connection.write(JSON.stringify({ type: 'error', message: 'client not found' }))

                return
            }

            client.write(JSON.stringify(`${message.from}: '${message.message}'`))
        }
    })

})

server.on('error', error => console.error(error))

server.listen(8888, () => console.log('server up'))