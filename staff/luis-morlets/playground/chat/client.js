const net = require('net')
const readline = require('readline')

const client = net.createConnection({ port: 6666 }, () => {
    console.log('connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you? ', name => {
        client.write(JSON.stringify({ type: 'id', name }))

        function chat() {
            rl.question('write to? ', to => {
                rl.question('what message? ', message => {
                    client.write(JSON.stringify({ type: 'text', from: name, to, message }))

                    chat()
                })
            })
        }

        chat()
    })
    client.on('data', data => console.log(data.toString()))
})