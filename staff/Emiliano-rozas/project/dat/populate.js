import 'dotenv/config'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Product, Review } from './index.js'

// Conexión mongo
db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([
        User.deleteMany(),
        Product.deleteMany(),
        Review.deleteMany(),
    ]))
    .then(() => populateUsers())
    .then(users => populateProducts(users)
        .then(products => populateReviews(users, products))) // Pasamos ambos
    .catch(console.error)
    .finally(() => db.disconnect());

// Función para llenar la colección de usuarios
const populateUsers = () => {
    return fs.readFile('./users.csv', 'utf-8').then(csv => {
        const lines = csv.split('\n').filter(line => line.trim())

        const creations = lines.map(line => {
            const [name, email, username, password, role] = line.split(',').map(item => item.trim())

            return User.create({
                name,
                email,
                username,
                password: bcrypt.hashSync(password, 10),
                role,
            });
        });

        return Promise.all(creations)
    });
};

// Función para llenar la colección de productos
const populateProducts = () => {
    return fs.readFile('./products.csv', 'utf-8').then(csv => {
        const lines = csv.split('\n').filter(line => line.trim())

        const creations = lines.map(line => {
            const [title,
                author,
                publisher,
                isbn,
                price,
                description,
                category,
                status,
                stock,
                image,
                imagesString,
            ] = line.split(',').map(item => item.trim())

            const images = imagesString ? imagesString.split(';').map(img => img.trim()) : []
            const bestSeller = Math.random() > 0.7

            return Product.create({
                title,
                author,
                publisher,
                isbn,
                price: parseFloat(price),
                description,
                category,
                status,
                stock: parseInt(stock),
                image,
                images,
                bestSeller
            });
        });

        return Promise.all(creations)
    });
};

// Función para llenar la colección de reseñas
const populateReviews = (users, products) => {
    return fs.readFile('./reviews.csv', 'utf-8').then(csv => {
        const lines = csv.split('\n').filter(line => line.trim())

        const creations = lines.map(line => {
            const [productTitle, username, rating, text] = line.split(',').map(item => item.trim())

            const user = users.find(u => u.username === username)
            // Encuentra el producto y el usuario para asociar la reseña
            const product = products.find(prod => prod.title === productTitle)
            if (!user || !product) return null

            return Review.create({
                author: user._id,
                rating: parseInt(rating, 10),
                text,
                date: new Date(),
            }).then(review => {
                // Asociamos la reseña al producto
                product.reviews.push(review)
                return product.save()
            })
        })

        return Promise.all(creations.filter(Boolean)); // solo las promesas validas continuaran en el array
    })
}
