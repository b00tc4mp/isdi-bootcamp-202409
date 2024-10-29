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
            rl.question('write to?\n', to => {
                rl.question('what message?\n', body => {
                    connection.write(JSON.stringify({ type: 'text', from, to, body }))

                    chat()
                })
            })
        }
        chat()
    })
    connection.on('data', data => {
        const { from, body } = JSON.parse(data.toString())

        console.log('MESSAGE')
        console.log(`FROM: ${from}`)
        console.log(`BODY: ${body}`)
    })
})