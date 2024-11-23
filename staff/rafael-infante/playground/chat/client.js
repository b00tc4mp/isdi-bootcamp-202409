const net = require('net')
const readline = require('readline')

const client = net.createConnection({ port: 8888 }, () => {
  console.log('connected to server')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('who are you? ', from => {
    client.write(JSON.stringify({ type: 'id', from }))

    const chat = () => {
      rl.question('write to? ', to => {
        rl.question('what message? ', body => {
          client.write(JSON.stringify({ type: 'text', from, to, body }))
          rl.question('Disconnect? y/n ', answer => {
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
  const { from, body } = JSON.parse(data.toString())

  console.log('MESSAGE')
  console.log(`FROM: ${from}`)
  console.log(`BODY: ${body}`)
})

client.on('end', () => {
  console.log('disconnected from server');
});