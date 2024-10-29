const net = require('net')

const clients = {}

const server = net.createServer(connection => {
  console.log('client connected')

  connection.on('data', data => {
    const message = JSON.parse(data.toString())

    if (message.type === 'id') {
      console.log(`client ${message.from} registered`)
      clients[message.from] = connection
    } else if (message.type === 'text') {
      const client = clients[message.to]

      if (!client) {
        connection.write(JSON.stringify({ type: 'error', body: 'client not found' }))

        return
      }

      client.write(JSON.stringify(message))
    }

  })
  connection.on('end', () => {
    console.log('client disconnected');
  })
})

server.on('error', error => console.error(error))

server.listen(8888, () => console.log('server up'))