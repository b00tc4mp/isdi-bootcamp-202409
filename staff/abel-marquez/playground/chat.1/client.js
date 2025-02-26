const net = require('net')
const readline = require('readline');

const connection = net.createConnection({ port: 8888 }, () => {
    console.log('connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you? ', name => {
        client.write(JSON.stringify({ type: 'id', name }))

        function chat() {
            rl.question('write to? ', name => {
                rl.question('what message? ', message => {
                    connection.write(JSON.stringify({ type: 'text', to: name, message }))

                    chat()
                })
            })
        }

        chat()
    })

    connection.on('data', data => console.log(data.toString()))
})