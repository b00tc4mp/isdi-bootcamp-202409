const net = require('net')
const readline = require('readline');

const client = net.createConnection({ port: 8888 }/*8888, "192.168.1.111"*/, () => {
    console.log('Connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you? ', name => {
        client.write(JSON.stringify({ type: 'id', name }))
        const from = name

        function chat() {
            console.log('entro en la función chat')

            rl.question('write to? ', name => {
                rl.question('what message? ', message => {

                    //client.write(JSON.stringify({ type: 'text', to: name, message, from }))

                    //for (i = 0; i < 10000; i++) {
                    client.write(JSON.stringify({ type: 'text', to: name, message, from }))
                    //}

                    chat()
                })
            })
        }
        chat()

    })

    client.on('data', data => console.log(data.toString()))
})