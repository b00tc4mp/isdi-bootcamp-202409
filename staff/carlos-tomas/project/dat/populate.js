import 'dotenv/config'
import db, { User, Pet } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Carlos Tomas',
        email: 'carlos@gmail.com',
        username: 'carlos25',
        password: '123123123',
        phone: '+34682519205',
        image: ''
    }),
    ]))
    .then(([carlos]) => Promise.all([
        Pet.create({
            owner: carlos.id,
            chip: '123456789123456',
            name: 'Peke',
            race: 'Cruce',
            sex: 'Macho',
            weight: '35',
            sterilized: true,
            image: ''
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())