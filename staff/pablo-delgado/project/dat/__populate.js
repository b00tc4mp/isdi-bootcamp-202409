import 'dotenv/config'

import fs from 'fs/promises'
//import bcrypt from 'bcryptjs'

import db, { Provider } from './index.js'
import { Location } from './models.js'

db.connect(process.env.MONGO_URL)
    .then(() => Provider.deleteMany())  // Elimina los datos previos de proveedores
    .then(() => fs.readFile('./providers.csv', 'utf-8'))  // Leemos el archivo CSV de providers
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [name, email, category, longitude, latitude , services, address, city, postalCode ] = line.split(',').map(item => item.trim()) 
           
            // Aquí creamos el provider con los campos del CSV
            return Provider.create({
                name,
                email,
                category: new Category({name: {}, }),
                location: new Location({coordinates: [parseFloat(longitude), parseFloat(latitude)]}),
                //latitude, 
                services,
                //longitude// Asumiendo que los servicios están separados por punto y coma
                address,
                city,
                postalCode
            })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())
