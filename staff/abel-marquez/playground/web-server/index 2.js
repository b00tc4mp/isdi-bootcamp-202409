import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    const { url } = req

    const dotIndex = url.lastIndexOf('.')
    const extension = url.slice(dotIndex + 1)

    fs.readFile(`public${url}`, (error, content) => {
        if (error) {
            res.statusCode = 404

            res.end('file not found')

            return

        }

       const html = content.toString()

       res.setHeader('Content-Type', `text/${extension}`)

       res.end(html)
    })
})

server.listen(8080, () => console.log('server is up'))