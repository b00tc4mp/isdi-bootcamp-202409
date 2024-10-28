const net = require('net')
const readline = require('readline')

const client = net.createConnection({ port: 8888 }, () => {
  console.log('connected to server')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('who are you?', name => {
    client.write(JSON.stringify({ type: 'id', name }))

    const chat = () => {
      rl.question('write to? ', name => {
        rl.question('what message? ', message => {
          client.write(JSON.stringify({ type: 'text', to: name, message }))
          rl.question('Disconnect? y/n', answer => {
            if (answer === 'y') {
              client.end()
              rl.close()
            } else {
              chat()
            }
          })
        })
      })
    }
    chat()


  })

})

client.on('data', data => {
  console.log(data.toString())
})

client.on('end', () => {
  console.log('disconnected from server');
});