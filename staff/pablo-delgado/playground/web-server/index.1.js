import http from 'http'

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')

    res.write(`<!D0CTYPE html>
    <html>
    <head>
    <title>Hole web!!</title>
    </head>
    <body>
    <h1>Hola, web</h1>
    </body>
    </html>`)
    res.end()
})

server.listen(8080, () => console.log('server is up'))