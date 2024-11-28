import express, { Request, Response } from 'express'

const api = express()

api.get('/ping', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'pong 🏓' })
})

api.listen(8080, () => console.log('Listening on localhost: 8080'))