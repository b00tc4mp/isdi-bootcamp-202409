const net = require('net')
const readline = require('readline')

const connection = net.createConnection({ port: 8888 }, () => {
    console.log('connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you?\n', from => {
        connection.write(JSON.stringify({ type: 'id', from }))

        function chat() {
            rl.question('write to?\n', name => {
                rl.question('what message?\n', body => {
                    connection.write(JSON.stringify({ type: 'text', to: name, from, body }))

                    chat()
                })
            })
        }

        chat()
    })
    connection.on('data', data => console.log(data.toString()))
})