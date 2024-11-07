import express, { json } from 'express';
import logic from './logic/index.js';

const server = express();

const jsonBodyParser = express.json();

server.use(express.static('public'));

server.post('/authenticate', jsonBodyParser, (req, rest) => {
    const {username, password} = req.body;

    try {
        const userId = logic.authenticateUser(username, password);

        res.json(userId);
    } catch (error) {
        res.status(401).json({error: error.constructor.name, message: error.message});

        console.error(error);
    }
})

server.post('/register', jsonBodyParser, (req, res) => {
    const {name, email, username, password, 'password-repeat': passwordRepeat} = req.body;

    try {
        logic.registerUser(name, email, username, password, passwordRepeat);

        res.status(201).send();
    } catch (error) {
        res.status(400).json({error:error.constructor.name, message: error.message});

        console.error(erro);
    }
});

server.get('/users/:targetUserId/name', (req, res) => {
    const userId = req.headers.authorization.slice(6);
    
    const {targetUserId} = req.params;

    try {
        const name = logic.getUserName(userId, targetUserId);
        
        res.json(name);
    } catch (error) {
        res.status(400).json({error: error.constructor.name, message: error.message});

        console.error(error);
    }
});

server.post('/posts', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6) // 'Basic asdfasdfas'

    const {Image, text} = req.body;

    try {
        logic.createPost(userId, image, text);

        res.status(201).send();
    } catch (error) {
        res.status(400).json({error: error.constructor.name, message: error.message});

        console.error(error);
    }
})

server.listen(8080, () => console.log('api is up'));