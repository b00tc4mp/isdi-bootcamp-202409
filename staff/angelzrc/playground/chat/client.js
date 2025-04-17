const net = require('net')
const readline = require('readline')

const client = net.createConnection(8888, "192.168.1.142", () => {
    console.log('Connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you? ', name => {
        client.write(JSON.stringify({ type: 'id', name }))
        const from = name

        function chat() {
            rl.question('write to? ', name => {
                rl.question('what message? ', message => {


                    client.write(JSON.stringify({ type: 'text', to: name, message, from: from }))


                    chat()
                })
            })
        }
        chat()
    })

    client.on('data', data => console.log(data.toString()))
})