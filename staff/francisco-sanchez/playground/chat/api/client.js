const net = require('net')
const readline = require('readline');

//En la siguiente linea podemos ejecutar contra un puerto para ejecutarlo en local, 
//También podemos especificar una dirección de un server para llamar a otro servidor
const connection = net.createConnection({ port: 8888 }/*8888, "192.168.1.111"*/, () => {
    console.log('Connected to server')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('who are you? ', from => {
        connection.write(JSON.stringify({ type: 'id', from }))


        function chat() {
            console.log('entro en la función chat')

            rl.question('write to? ', to => {
                rl.question('what message? ', body => {

                    //Aquí metemos el mensaje, remitente y destinatario y lo enviamos al servidor
                    connection.write(JSON.stringify({ type: 'text', from, to, body }))
                    chat()
                })
            })
        }

        chat()
    })

    //Aquí es donde el cliente recibe la respuesta del servidor 
    connection.on('data', data => {
        const { from, body } = JSON.parse(data.toString())
        console.log('MESSAGE')
        console.log(`FROM: ${from}`)
        console.log(`BODY: ${body}`)
    })
})