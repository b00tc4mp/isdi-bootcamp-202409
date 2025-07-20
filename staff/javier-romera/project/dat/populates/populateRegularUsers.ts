import 'dotenv/config'

import db from '../index.js'
import { User } from '../models/index.js'
import bcrypt from 'bcryptjs'

db.connect(process.env.ALLPIECE_URL!)
    .then(() => User.deleteMany())
    .then(() => Promise.all([
        User.create({
            email: 'javi@gmail.com',
            username: 'javi',
            password: bcrypt.hashSync('123123123', 10),
            score: 500
        }), User.create({
            email: 'javi2@gmail.com',
            username: 'javi2',
            password: bcrypt.hashSync('123123123', 10),
            score: 1250
        }), User.create({
            email: 'javi3@gmail.com',
            username: 'javi3',
            password: bcrypt.hashSync('123123123', 10),
            score: 1750
        }), User.create({
            email: 'javi4@gmail.com',
            username: 'javi4',
            password: bcrypt.hashSync('123123123', 10),
            score: 3000
        }), User.create({
            email: 'javi5@gmail.com',
            username: 'javi5',
            password: bcrypt.hashSync('123123123', 10),
            score: 5000
        }),
        User.create({
            email: 'javi6@gmail.com',
            username: 'javi6',
            password: bcrypt.hashSync('123123123', 10),
            score: 5001
        }), User.create({
            email: 'javi7@gmail.com',
            username: 'javi7',
            password: bcrypt.hashSync('123123123', 10),
            score: 5002
        }), User.create({
            email: 'javi8@gmail.com',
            username: 'javi8',
            password: bcrypt.hashSync('123123123', 10),
            score: 5003
        }), User.create({
            email: 'javi9@gmail.com',
            username: 'javi9',
            password: bcrypt.hashSync('123123123', 10),
            score: 5004
        }), User.create({
            email: 'javi10@gmail.com',
            username: 'javi10',
            password: bcrypt.hashSync('123123123', 10),
            score: 5005
        }),
        User.create({
            email: 'javi11@gmail.com',
            username: 'javi11',
            password: bcrypt.hashSync('123123123', 10),
            score: 5006
        }), User.create({
            email: 'javi12@gmail.com',
            username: 'javi12',
            password: bcrypt.hashSync('123123123', 10),
            score: 5007
        }), User.create({
            email: 'javi13@gmail.com',
            username: 'javi13',
            password: bcrypt.hashSync('123123123', 10),
            score: 5008
        }), User.create({
            email: 'javi14@gmail.com',
            username: 'javi14',
            password: bcrypt.hashSync('123123123', 10),
            score: 5009
        }), User.create({
            email: 'javi15@gmail.com',
            username: 'javi15',
            password: bcrypt.hashSync('123123123', 10),
            score: 5010
        }),
        User.create({
            email: 'javi16@gmail.com',
            username: 'javi16',
            password: bcrypt.hashSync('123123123', 10),
            score: 5011
        }), User.create({
            email: 'javi17@gmail.com',
            username: 'javi17',
            password: bcrypt.hashSync('123123123', 10),
            score: 5012
        }), User.create({
            email: 'javi18@gmail.com',
            username: 'javi18',
            password: bcrypt.hashSync('123123123', 10),
            score: 5013
        }), User.create({
            email: 'javi19@gmail.com',
            username: 'javi19',
            password: bcrypt.hashSync('123123123', 10),
            score: 5014
        }), User.create({
            email: 'javi20@gmail.com',
            username: 'javi20',
            password: bcrypt.hashSync('123123123', 10),
            score: 5015
        }),
        User.create({
            email: 'javi21@gmail.com',
            username: 'javi21',
            password: bcrypt.hashSync('123123123', 10),
            score: 5016
        }), User.create({
            email: 'javi22@gmail.com',
            username: 'javi22',
            password: bcrypt.hashSync('123123123', 10),
            score: 5017
        }), User.create({
            email: 'javi23@gmail.com',
            username: 'javi23',
            password: bcrypt.hashSync('123123123', 10),
            score: 5018
        }), User.create({
            email: 'javi24@gmail.com',
            username: 'javi24',
            password: bcrypt.hashSync('123123123', 10),
            score: 5019
        }), User.create({
            email: 'javi25@gmail.com',
            username: 'javi25',
            password: bcrypt.hashSync('123123123', 10),
            score: 5020
        }),
        User.create({
            email: 'javi26@gmail.com',
            username: 'javi26',
            password: bcrypt.hashSync('123123123', 10),
            score: 5021
        }), User.create({
            email: 'javi27@gmail.com',
            username: 'javi27',
            password: bcrypt.hashSync('123123123', 10),
            score: 5022
        }), User.create({
            email: 'javi28@gmail.com',
            username: 'javi28',
            password: bcrypt.hashSync('123123123', 10),
            score: 5023
        }), User.create({
            email: 'javi29@gmail.com',
            username: 'javi29',
            password: bcrypt.hashSync('123123123', 10),
            score: 5024
        }), User.create({
            email: 'javi30@gmail.com',
            username: 'javi30',
            password: bcrypt.hashSync('123123123', 10),
            score: 5025
        }),
        User.create({
            email: 'javi31@gmail.com',
            username: 'javi31',
            password: bcrypt.hashSync('123123123', 10),
            score: 5026
        }), User.create({
            email: 'javi32@gmail.com',
            username: 'javi32',
            password: bcrypt.hashSync('123123123', 10),
            score: 5027
        }), User.create({
            email: 'javi33@gmail.com',
            username: 'javi33',
            password: bcrypt.hashSync('123123123', 10),
            score: 5028
        }), User.create({
            email: 'javi34@gmail.com',
            username: 'javi34',
            password: bcrypt.hashSync('123123123', 10),
            score: 5029
        }), User.create({
            email: 'javi35@gmail.com',
            username: 'javi35',
            password: bcrypt.hashSync('123123123', 10),
            score: 5030
        }),
    ]))
    .catch(console.error)
    .then(() => console.log('populated regular users'))
    .finally(() => db.disconnect())