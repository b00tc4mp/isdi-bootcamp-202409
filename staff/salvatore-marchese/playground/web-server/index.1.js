import http from 'http'

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')

    res.write(`<!DOCTYPE html>
    <html>
        <head>
            <title>Hola, Web!</title>
        </head>
        <body>
            <h1>Hola, Web!</h1>
        </body>
    </html>`)

    res.end()
})

server.listen(8080, () => console.log('server is up'))