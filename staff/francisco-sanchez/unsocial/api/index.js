import db from 'dat'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors' //Para permitir el acceso a la api desde la app
import { errors } from 'com'

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } = errors

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        console.log('Conected to database')

        //Inicializamos el server de express 
        const server = express()


        //Esto nos permite que la api sea accedida de muchos sitios
        server.use(cors())


        //Parsea todas las !!!respuestas!!! de express a json
        const jsonBodyParser = express.json()

        //Literalmente le decimos: 
        //Cuando entre una petición get en la raiz del documento "/", devuelve Hello Api! 
        server.get('/', (_, res) => res.send('Hello, API! Status = Ready to go!'))


        //Nos indica la ruta de la carpeta public, sitio en el que están todos los archivos
        //html, css, ... direcamente desde el navegador 
        //server.use(express.static('public'))

        //Un post lleva toda la información en el cuerpo
        //Usamos jsonbodyparser para transformar todo a json, desestructura y valida
        //Si todo va bien devolvemos el userId


        //Cómo es un método usaremos siempre un try / catch
        server.post('/authenticate', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => res.json(userId))
                    .catch(error => {
                        res.status(401).json({ error: error.constructor.name, message: error.message })
                        console.error(error)
                    })
                // const userId = logic.authenticateUser(username, password)
                // res.json(userId)

            } catch (error) {
                res.status(401).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        server.post('/register', jsonBodyParser, (req, res) => {
            try {
                const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

                logic.registerUser(name, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        //el ":userId", sirve para pasar el usuario como parte de la URL 
        // Ejemplo de la llamada --> curl http://localhost:8080/users/m2ey7tvjg0t/name -v (El user que le pasamos es variable)
        server.get('/users/:targetUserId/name', (req, res) => {

            try {
                //const { userId } = req.params
                const userId = req.headers.authorization.slice(6)

                const { targetUserId } = req.params

                //const name = logic.getUserName(userId, targetUserId)
                //res.json(name)

                logic.getUserName(userId, targetUserId)
                    .then(name => res.status(200).json(name)) //Devolvemos código de respuesta + contenido nombre
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                        console.error(error)
                    })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })

        //Inserta los posts
        server.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { image, text } = req.body

                logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })


        //Recupera los posts
        server.get('/posts', (req, res) => {
            try {

                const userId = req.headers.authorization.slice(6)

                //const posts = logic.getPosts(userId)
                logic.getPosts(userId)

                    .then(posts => {
                        //.then(() => res.status(201).send())
                        res.status(200).json(posts) //Devolvemos ok status + posts
                    })
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                        console.error(error)
                    })
                //res.json(posts)
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)

            }
        })

        //elimina un post
        server.delete('/posts/:postId', jsonBodyParser, (req, res) => {
            try {
                const { postId } = req.params
                const userId = req.headers.authorization.slice(6)

                logic.deletePost(userId, postId)
                    .then(result => {
                        //.then(() => res.status(201).send())
                        res.status(200).json(result) //Devolvemos ok status + posts
                    })
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        //Montar la url para los addComments
        server.post('/posts/:postId/comments', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { postId } = req.params
                const { text } = req.body

                logic.addComment(userId, postId, text)
                    .then(() =>
                        res.status(201).send()
                        //res.status(201).send()
                    )
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })

        //Llamada al toggle like posts
        server.patch('/posts/:postId/likes', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

                logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                        console.error(error)
                    })


            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        //url para removeComment
        server.delete('/posts/:postId/comments/:commentId', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId, commentId } = req.params

                logic.removeComment(userId, postId, commentId)
                    .then(() => {
                        res.status(204).send()
                    })
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                        console.error(error)
                    })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })



        //url para getComments
        server.get('/posts/:postId/comments', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { postId } = req.params

                logic.getComments(userId, postId)
                    .then(comments => res.json(comments))
                    .catch(error => {
                        if (error instanceof NotFoundError)
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        else
                            res.status(500).json({ error: SystemError.name, message: error.message })

                        console.error(error)
                    })

            } catch (error) {
                if (error instanceof ValidationError)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                else
                    res.status(500).json({ error: SystemError.name, message: error.message })

                console.error(error)

            }
        })

        server.listen(8080, () => console.log('api is up'))

    })





