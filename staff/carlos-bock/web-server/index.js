import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    const {url} = req;

    const dotIndex = url.lastIndexOf('.');
    const extension = url.slice(dotIndex + 1);

    fs.readFile(`public${url}`, (error, content) => {
        if (error) {
            res.statusCode = 404;

            res.end('file not found');

            return;
        }

        let mime = 'text/plain';
        let body = content;

        if (extension === 'html' || extension === 'css') {
            mime = `text/${extension}`;

            body = content.toString()
        } else if (extension === 'jpg')
            mime = 'image/jpeg';
        else if (extension === 'png')
            mime = 'image/png';
        else if (extension == 'mp3')
            mime = 'audio/mpeg';

        res.setHeader('Content-Type', mime);

        res.end(body);
    })

})

server.listen(8080, () => console.log('server is up'));