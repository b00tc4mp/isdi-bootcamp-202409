// import 'dotenv/config'

// import * as chai from 'chai'
// import chaiAsPromised from 'chai-as-promised'

// chai.use(chaiAsPromised)
// const { expect } = chai

// import db, { User, Product } from 'dat'
// import { errors } from 'com'

// const { NotFoundError, ValidationError, SystemError, AuthorizationError } = errors

// import createProduct from './createProduct.js'



// describe('createProduct', () => {
//     before(async () => {
//         await db.connect(process.env.MONGO_URL_TEST)
//     })

//     beforeEach(async () => {
//         await Promise.all([
//             User.deleteMany(),
//             Product.deleteMany()
//         ])
//     })

//     // Escenario 1: Producto creado con éxito
//     it('succeeds on valid moderator user', async () => {
//         const user = await User.create({ name: 'Admin User', email: 'admin@store.com', username: 'adminuser', password: '123123123', role: 'moderator' })

//         const productData = {
//             title: 'Sample Product',
//             author: 'Author Name',
//             publisher: 'Publisher Name',
//             isbn: '123456789X',
//             price: 19.99,
//             description: 'A description for the product.',
//             category: 'Comics',
//             status: 'published',
//             stock: 20,
//             image: 'https://example.com/product.jpg',
//             images: ['https://example.com/product1.jpg', 'https://example.com/product2.jpg'],
//             bestSeller: true
//         }

//         const response = await createProduct(user.id, ...Object.values(productData))

//         expect(response).to.exist
//         expect(response.message).to.equal('Product created successfully')

//         const product = await Product.findOne({ title: 'Sample Product' })
//         expect(product).to.exist
//         expect(product).to.have.property('title', 'Sample Product')
//     })

//     // Escenario 2: Usuario no autorizado
//     it('fails on unauthorized user', async () => {
//         const user = await User.create({ name: 'Regular User', email: 'user@store.com', username: 'regularuser', password: '123123123', role: 'regular' })

//         const productData = {
//             title: 'Unauthorized Product',
//             author: 'Author Name',
//             publisher: 'Publisher Name',
//             isbn: '123456789X',
//             price: 15.99,
//             description: 'A product that cannot be added.',
//             category: 'Comics',
//             status: 'published',
//             stock: 10,
//             image: 'https://example.com/product.jpg',
//             images: [],
//             bestSeller: false
//         }

//         await expect(createProduct(user.id, ...Object.values(productData)))
//             .to.be.rejectedWith(AuthorizationError, 'Not authorized')
//     })

//     // Escenario 3: Usuario no encontrado
//     it('fails on non-existing user', async () => {
//         const nonExistingUserId = '649e2f5a9c1b992f6f9f1234'

//         const productData = {
//             title: 'Sample Product',
//             author: 'Author Name',
//             publisher: 'Publisher Name',
//             isbn: '123456789X',
//             price: 19.99,
//             description: 'A description for the product.',
//             category: 'Comics',
//             status: 'published',
//             stock: 20,
//             image: 'https://example.com/product.jpg',
//             images: [],
//             bestSeller: true
//         }

//         await expect(createProduct(nonExistingUserId, ...Object.values(productData)))
//             .to.be.rejectedWith(SystemError, 'User not found')
//     })

//     // Escenario 4: Error de validación
//     it('fails on invalid ISBN', async () => {
//         const user = await User.create({ name: 'Admin User', email: 'admin@store.com', username: 'adminuser', password: '123123123', role: 'moderator' })

//         const invalidProductData = {
//             title: 'Sample Product',
//             author: 'Author Name',
//             publisher: 'Publisher Name',
//             isbn: 'invalid_isbn', // ISBN inválido
//             price: 19.99,
//             description: 'A description for the product.',
//             category: 'Comics',
//             status: 'published',
//             stock: 20,
//             image: 'https://example.com/product.jpg',
//             images: [],
//             bestSeller: true
//         }

//         await expect(createProduct(user.id, ...Object.values(invalidProductData)))
//             .to.be.rejectedWith(ValidationError, 'invalid ISBN format')
//     })

//     after(async () => {
//         await db.disconnect()
//     })
// })